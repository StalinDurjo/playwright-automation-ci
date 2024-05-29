import WoocommerceApi from "support/mock-utility/api/woocommerce";
import BaseMockUtility from "./base-mock-utility";

export default class CommissionUtility extends BaseMockUtility {
  readonly woocommerceApi: WoocommerceApi = this.woocommerceApi;

  constructor({ baseUrl }: { baseUrl: string }) {
    super({ baseUrl });
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

  async createOrder({
    paymentMethod,
    paymentMethodTitle,
    setPaid,
    billing,
    lineItems
  }: {
    paymentMethod?: string;
    paymentMethodTitle?: string;
    setPaid?: boolean;
    billing?: {
      firstName?: string;
      lastName?: string;
      address1?: string;
      address2?: string;
      city?: string;
      state?: string;
      postode?: string;
      country?: string;
      email?: string;
      phone?: string;
    };
    shipping?: {
      firstName?: string;
      lastName?: string;
      address1?: string;
      address2?: string;
      city?: string;
      state?: string;
      postcode?: string;
      country?: string;
    };
    lineItems?: { productId?: number; variationId?: number; quantity?: number }[];
  }) {
    const response = await (
      await this.woocommerceApi.createOrder({
        paymentMethod: paymentMethod,
        paymentMethodTitle: paymentMethodTitle,
        setPaid: setPaid,
        billing: {
          firstName: billing.firstName,
          lastName: billing.lastName,
          address1: billing.address1,
          city: billing.city,
          state: billing.state,
          postode: billing.postode,
          country: billing.country,
          email: billing.email,
          phone: billing.phone
        },
        lineItems: [...lineItems]
      })
    ).data;

    return {
      orderId: response.id,
      total: response.total
    };
  }
}
