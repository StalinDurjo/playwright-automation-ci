import MockApi from "./mock-api";

export default class WoocommerceApi extends MockApi {
  private baseUrl: string;

  constructor({ baseUrl }: { baseUrl: string }) {
    super();
    this.baseUrl = baseUrl;
  }

  async createProduct(requestBody: FormData) {
    try {
      // API Reference: https://woocommerce.github.io/woocommerce-rest-api-docs/?javascript#products
      const response = await this.request.post(`${this.baseUrl}/wp-json/wc/v3/products`, requestBody);
      return await response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async enableTax(isEnabled: boolean) {
    try {
      const payload = {
        value: isEnabled === true ? "yes" : "no"
      };
      await this.request.put(`${this.baseUrl}/wp-json/wc/v3/settings/general/woocommerce_calc_taxes`, payload);
    } catch (error) {
      console.log(error);
    }
  }

  async setPriceEnteredWithTaxTo(isPriceEnteredWithTax: boolean) {
    try {
      const payload = {
        value: isPriceEnteredWithTax === true ? "yes" : "no"
      };
      await this.request.put(`${this.baseUrl}/wp-json/wc/v3/settings/tax/woocommerce_prices_include_tax`, payload);
    } catch (error) {
      console.log(error);
    }
  }

  async setRoundTaxAtSubtotal(isEnabled: boolean) {
    try {
      const payload = {
        value: isEnabled === true ? "yes" : "no"
      };
      await this.request.put(`${this.baseUrl}/wp-json/wc/v3/settings/tax/woocommerce_tax_round_at_subtotal`, payload);
    } catch (error) {
      console.log(error);
    }
  }

  async createTaxRate({
    country,
    state,
    cities,
    postcodes,
    rate,
    name,
    shipping
  }: {
    country: string;
    state: string;
    cities: string[];
    postcodes: string[];
    rate: string;
    name: string;
    shipping: boolean;
  }) {
    try {
      const payload = {
        country: country,
        state: state,
        cities: cities,
        postcodes: postcodes,
        rate: rate,
        name: name,
        shipping: shipping
      };
      await this.request.post(`${this.baseUrl}/wp-json/wc/v3/taxes`, payload);
    } catch (error) {
      console.log(error);
    }
  }

  async createShippingZone({ name }: { name: string }) {
    try {
      const payload = { name };
      const response = await this.request.post(`${this.baseUrl}/wp-json/wc/v3/shipping/zones`, payload);
      return await response.data();
    } catch (error) {
      console.log(error);
    }
  }

  async createShippingMethod(shippingZoneId: number, { method }: { method: "flat_rate" }) {
    try {
      const payload = {
        method_id: method
      };
      const response = await this.request.post(`${this.baseUrl}/wp-json/wc/v3/shipping/zones/${shippingZoneId}/methods`, payload);
      return await response.data();
    } catch (error) {
      console.log(error);
    }
  }

  async updateShippingMethod(
    shippingZoneId: number,
    shippingMethodId: number,
    {
      method,
      methodTitle,
      methodDescription,
      cost,
      taxStatus
    }: {
      method: "flat_rate";
      methodTitle: string;
      methodDescription: string;
      cost: string;
      taxStatus: "taxable" | "none";
    }
  ) {
    try {
      const payload = {
        method_id: method,
        method_title: methodTitle,
        method_description: methodDescription,
        settings: {
          cost: cost,
          tax_status: taxStatus
        }
      };
      const response = await this.request.post(`${this.baseUrl}/wp-json/wc/v3/shipping/zones/${shippingZoneId}/methods/${shippingMethodId}`, payload);
      return await response.data();
    } catch (error) {
      console.log(error);
    }
  }
}
