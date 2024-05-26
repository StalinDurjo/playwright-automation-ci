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
      return await this.request.post(`${this.baseUrl}/wp-json/wc/v3/products`, requestBody);
    } catch (error) {
      console.error(error);
    }
  }

  async enableTax(isEnabled: boolean) {
    try {
      const payload = {
        value: isEnabled === true ? "yes" : "no"
      };
      return await this.request.put(`${this.baseUrl}/wp-json/wc/v3/settings/general/woocommerce_calc_taxes`, payload);
    } catch (error) {
      console.log(error);
    }
  }

  async setPriceEnteredWithTaxTo(isPriceEnteredWithTax: boolean) {
    try {
      const payload = {
        value: isPriceEnteredWithTax === true ? "yes" : "no"
      };
      return await this.request.put(`${this.baseUrl}/wp-json/wc/v3/settings/tax/woocommerce_prices_include_tax`, payload);
    } catch (error) {
      console.log(error);
    }
  }

  async setRoundTaxAtSubtotal(isEnabled: boolean) {
    try {
      const payload = {
        value: isEnabled === true ? "yes" : "no"
      };
      return await this.request.put(`${this.baseUrl}/wp-json/wc/v3/settings/tax/woocommerce_tax_round_at_subtotal`, payload);
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
    country?: string;
    state?: string;
    cities?: string[];
    postcodes?: string[];
    rate?: string;
    name?: string;
    shipping?: boolean;
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
      return await this.request.post(`${this.baseUrl}/wp-json/wc/v3/taxes`, payload);
    } catch (error) {
      console.log(error);
    }
  }

  async createShippingZone({ name }: { name: string }) {
    try {
      const payload = { name };
      return await this.request.post(`${this.baseUrl}/wp-json/wc/v3/shipping/zones`, payload);
    } catch (error) {
      console.log(error);
    }
  }

  async createShippingMethod(shippingZoneId: number, { method }: { method: "flat_rate" }) {
    try {
      const payload = {
        method_id: method
      };
      return await this.request.post(`${this.baseUrl}/wp-json/wc/v3/shipping/zones/${shippingZoneId}/methods`, payload);
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
      method?: "flat_rate";
      methodTitle?: string;
      methodDescription?: string;
      cost?: string;
      taxStatus?: "taxable" | "none";
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
      return await this.request.post(`${this.baseUrl}/wp-json/wc/v3/shipping/zones/${shippingZoneId}/methods/${shippingMethodId}`, payload);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteShippingZone(shippingZoneId: number) {
    try {
      const payload = {
        force: true
      };
      return await this.request.delete({ requestPath: `${this.baseUrl}/wp-json/wc/v3/shipping/zones/${shippingZoneId}`, requestBody: payload });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTaxRate(taxId: number) {
    try {
      const payload = {
        force: true
      };
      return await this.request.delete({ requestPath: `${this.baseUrl}/wp-json/wc/v3/taxes/${taxId}`, requestBody: payload });
    } catch (error) {
      console.log(error);
    }
  }

  async createOrder({
    paymentMethod
  }: {
    paymentMethod?: string;
    paymentMethodTitle?: string;
    setPaid?: string;
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
  } = {}) {
    try {
      const payload = {};
      return await this.request.post(`${this.baseUrl}/wp-json/wc/v3/orders`, payload);
    } catch (error) {
      console.log(error);
    }
  }
}
