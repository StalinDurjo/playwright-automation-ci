import DataLoader from "support/lib/data-loader";
import { Mode } from "support/types/global";
import WoocommerceApi from "./api/woocommerce";
import { testConfig } from "test.config";

export default class MockUtility {
  private baseUrl: string;
  private mode: Mode;
  private loader: DataLoader;
  private woocommerceApi: WoocommerceApi;
  private username: string;
  private password: string;

  constructor({ baseUrl }: { baseUrl: string }) {
    this.baseUrl = baseUrl;
    this.loader = new DataLoader({ mockFilePrefix: testConfig.mockFilePrefix, searchFolder: testConfig.mockFileDirectory });
    this.woocommerceApi = new WoocommerceApi({ baseUrl: this.baseUrl });
  }

  useMode(mode: Mode) {
    this.mode = mode;
  }

  setBasicAuth(username: string, password: string) {
    this.username = username;
    this.password = password;
    this.woocommerceApi.setBasicAuth(this.username, this.password);
  }

  async createProducts({ limit }: { limit?: number } = {}) {
    try {
      const formData = await this.loader.getFormData("products", {
        include: [
          "name",
          "type",
          "status",
          "featured",
          "catalog_visibility",
          "short_description",
          "description",
          "regular_price",
          "sale_price",
          "date_on_sale_from",
          "date_on_sale_to",
          "tax_status"
        ]
      });
      const limitedFormData = limit || limit === 0 ? formData.splice(0, limit) : formData;

      if (this.mode === "API") {
        for (const form of limitedFormData) {
          this.woocommerceApi.setContentType("multipart/form-data");
          await this.woocommerceApi.createProduct(form);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async enableTax(isTaxEnabled: boolean) {
    try {
      if (this.mode === "API") {
        await this.woocommerceApi.enableTax(isTaxEnabled);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
