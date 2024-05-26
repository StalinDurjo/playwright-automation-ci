import DataLoader from "support/lib/data-loader";
import WoocommerceApi from "support/mock-utility/api/woocommerce";
import { Mode } from "support/types/global";
import { testConfig } from "test.config";

export default class CommissionUtil {
  private baseUrl: string;
  private mode: Mode;
  private loader: DataLoader;
  readonly woocommerceApi: WoocommerceApi;
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

  async getAllLineItemCharges() {
    return await this.loader.getData("line-item-charges");
  }

  async setTaxInclusive(isInclusive: boolean): Promise<boolean> {
    const response = (await this.woocommerceApi.setPriceEnteredWithTaxTo(isInclusive)).data;

    return response["value"] === "yes" ? true : false;
  }

  async setTaxRounding(isRounded: boolean): Promise<boolean> {
    const response = (await this.woocommerceApi.setRoundTaxAtSubtotal(isRounded)).data;
    return response["value"] === "yes" ? true : false;
  }

  async setTax({ rate, taxOnShipping }: { rate: string; taxOnShipping?: boolean }) {
    const response = (await this.woocommerceApi.createTaxRate({ rate, shipping: taxOnShipping })).data;

    return {
      id: response.id,
      rate: response.rate,
      shipping: response.shipping
    };
  }

  async setShipping({ name, cost, shippingPerQty, taxOnShipping }: { name?: string; cost?: string; shippingPerQty?: boolean; taxOnShipping?: boolean } = {}) {
    let shippingZoneId: number;
    let shippingMethodId: number;
    let isShippingTaxable: boolean;
    let shippingRate: number;

    const shippingZoneResponse = (await this.woocommerceApi.createShippingZone({ name: name ? name : "test shipping zone" })).data;
    shippingZoneId = shippingZoneResponse.id;

    const shippingMethodResponse = (await this.woocommerceApi.createShippingMethod(shippingZoneResponse.id, { method: "flat_rate" })).data;
    shippingMethodId = shippingMethodResponse.id;

    const shippingMethodUpdateResponse = (
      await this.woocommerceApi.updateShippingMethod(shippingZoneId, shippingMethodId, {
        cost: shippingPerQty ? `${cost} * [qty]` : cost,
        taxStatus: taxOnShipping ? "taxable" : "none"
      })
    ).data;

    isShippingTaxable = shippingMethodUpdateResponse["settings"]["tax_status"]["value"] === "taxable" ? true : false;

    const shippingRateFromResponse = shippingMethodUpdateResponse["settings"]["cost"]["value"];
    shippingRate = shippingPerQty ? shippingRateFromResponse.split(" * [qty]")[0] : shippingRateFromResponse;

    return {
      shippingZoneId,
      shippingMethodId,
      isShippingTaxable,
      shippingRate: Number(shippingRate)
    };
  }

  async createProduct({ name, type, price, taxable }: { name?: string; type?: "simple" | "variable"; price?: string; taxable?: "taxable" | "none" } = {}) {
    const form = new FormData();
    form.append("name", name ? name : "test product");
    form.append("type", type ? type : "simple");
    form.append("regular_price", price);
    form.append("tax_status", taxable ? taxable : "taxable");

    const response = (await this.woocommerceApi.createProduct(form)).data;

    return {
      productId: response.id,
      productPrice: response.price,
      productTaxStatus: response.tax_status
    };
  }
}
