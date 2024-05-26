import BaseMockUtility from "./base-mock-utility";

export default class ProductMockUtility extends BaseMockUtility {
  constructor({ baseUrl }: { baseUrl: string }) {
    super({ baseUrl });
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
