import path from "path";
import { loadJsonFile } from "load-json-file";
import { csvToJsObject, searchFiles } from "support/utils/utils";

export type FileDetails = {
  baseName: string;
  mockFileName: string;
  fileType: string;
  filePath: string;
};

/**
 * Class for loading and filtering mock data from JSON or CSV files.
 */
export default class DataLoader {
  private mockFilePrefix: string;
  private searchFolder: string;

  /**
   * Creates an instance of DataLoader.
   * @param mockFilePrefix The prefix used for mock files (default is "mock").
   * @param searchFolder The folder to search for mock files (default is "default").
   */
  constructor({ mockFilePrefix, searchFolder: searchFolder }: { mockFilePrefix?: string; searchFolder?: string } = {}) {
    this.mockFilePrefix = mockFilePrefix || "mock";
    this.searchFolder = searchFolder || "default";
  }

  /**
   * Searches for mock files in the specified directory.
   * @param directory The directory to search for mock files (default is "default" which represents the project root).
   * @returns An array of FileDetails representing the mock files found.
   */
  private fileLoader(directory: string = "default"): FileDetails[] {
    try {
      let directoryPath: string;

      if (directory === "default") {
        // load project root directory
        directoryPath = path.resolve(process.cwd());
      } else {
        directoryPath = directory;
      }

      const files = searchFiles(directoryPath, [".json", ".csv"], ["node_modules"]);

      // returns files that contains mock data prefix
      // expects mock data prefix to be the last string after file extension
      const mockFiles = files.filter((file) => {
        const splitName = path.basename(file).split(".");
        return splitName[splitName.length - 2] === this.mockFilePrefix;
      });

      return mockFiles.map((file) => {
        const baseName = path.basename(file);
        const extension = path.extname(file);
        const fileName = baseName.replace("." + this.mockFilePrefix, "").replace(extension, "");

        return {
          baseName: baseName,
          mockFileName: fileName,
          fileType: extension.replace(".", ""),
          filePath: file
        };
      });
    } catch (error) {
      console.log("Failed to search for mock files.");
    }
  }

  /**
   * Applies filters to the provided data.
   * @param data The data to filter.
   * @param options Options for filtering (reverse, include, exclude).
   * @returns The filtered data.
   */
  private async applyFilter(data: object[], { reverse, include, exclude }: { reverse?: boolean; include: string[]; exclude: string[] }) {
    try {
      const includeList = data.map((data) => {
        const mappedData = {};
        for (const [key, value] of Object.entries(data)) {
          if (include?.length > 0 && !include.includes(key)) {
            continue;
          }

          mappedData[key] = value;
        }
        return mappedData;
      });

      const excludeList = includeList.map((data) => {
        const mappedData = {};
        for (const [key, value] of Object.entries(data)) {
          if (exclude?.includes(key)) {
            continue;
          }

          mappedData[key] = value;
        }

        return mappedData;
      });

      return reverse ? excludeList.reverse() : excludeList;
    } catch (error) {
      console.log("Failed to apply filters to mock data");
    }
  }

  /**
   * Retrieves mock data from a file.
   * @param dataFileName The name of the mock file.
   * @param options Options for filtering (reverse, include, exclude).
   * @returns The mock data.
   */
  async getData(dataFileName: string, { reverse, include, exclude }: { reverse?: boolean; include?: string[]; exclude?: string[] } = {}): Promise<Object> {
    try {
      let mockData: unknown;
      const files = this.fileLoader(this.searchFolder);

      for (const file of files) {
        if (file.mockFileName === dataFileName) {
          if (file.fileType === "csv") {
            mockData = await this.applyFilter((await csvToJsObject(file.filePath)) as object[], { reverse, include, exclude });
          } else if (file.fileType === "json") {
            mockData = await this.applyFilter(await loadJsonFile(file.filePath), { reverse, include, exclude });
          }
        }
      }

      return mockData;
    } catch (error) {
      console.log("Failed to get mock data.");
    }
  }

  /**
   * Retrieves mock form data from a file.
   * @param dataFileName The name of the mock file.
   * @param options Options for filtering (reverse, include, exclude).
   * @returns An array of FormData objects.
   */
  async getFormData(dataFileName: string, { reverse, include, exclude }: { reverse?: boolean; include?: string[]; exclude?: string[] } = {}): Promise<FormData[]> {
    try {
      const formData = [];
      let mockData: unknown = await this.getData(dataFileName, { reverse, include, exclude });

      if (!mockData) return;

      for (const data of mockData as unknown[]) {
        const form = new FormData();
        for (const [key, value] of Object.entries(data)) {
          form.append(key, value as string);
        }
        formData.push(form);
      }

      return formData;
    } catch (error) {
      console.log("Failed to get mock form data.");
    }
  }
}
