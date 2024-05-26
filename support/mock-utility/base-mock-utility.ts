import DataLoader from "support/lib/data-loader";
import { Mode } from "support/types/global";
import WoocommerceApi from "./api/woocommerce";
import { testConfig } from "test.config";

export default class BaseMockUtility {
  protected baseUrl: string;
  protected mode: Mode;
  protected loader: DataLoader;
  protected woocommerceApi: WoocommerceApi;
  protected username: string;
  protected password: string;

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
}
