import { test, expect } from "@playwright/test";
import { calculateCharge } from "support/calculate-charge";
import CommissionUtility from "support/mock-utility/commission-utility";
import { toBoolean } from "support/utils/utils";
import { GLOBAL_ADMIN_PASSWORD, GLOBAL_ADMIN_USERNAME } from "support/variable";

test.only("Line Item Commission Test", async ({ page }, testInfo) => {
  const commission = new CommissionUtility({ baseUrl: testInfo.project.use.baseURL });
  commission.setBasicAuth(GLOBAL_ADMIN_USERNAME, GLOBAL_ADMIN_PASSWORD);

  await commission.woocommerceApi.enableTax(true);

  for (const charge of (await commission.getAllLineItemCharges()) as Object[]) {
    let isTaxInclusive: boolean;
    let isTaxRounded: boolean;

    let taxId: number;
    let taxRate: number;
    let shippingOnTax: boolean;
    let shippingRate: number;
    let shippingZoneId: number;
    let productId: number;
    let productPrice: string;
    let orderTotal: string;

    isTaxInclusive = await commission.setTaxInclusive(toBoolean(charge["is_tax_inclusive"]));
    isTaxRounded = await commission.setTaxRounding(toBoolean(charge["tax_round_at_subtotal"]));

    const taxResponse = await commission.setTax({ rate: charge["tax_rate"], taxOnShipping: toBoolean(charge["tax_on_shipping"]) });
    taxId = taxResponse.id;
    taxRate = taxResponse.rate;
    shippingOnTax = taxResponse.shipping;

    const shippingResponse = await commission.setShipping({
      name: "Test Shipping",
      cost: charge["shipping_rate"],
      shippingPerQty: toBoolean(charge["shipping_per_qty"]),
      taxOnShipping: toBoolean(charge["tax_on_shipping"])
    });
    shippingRate = shippingResponse.shippingRate;
    shippingZoneId = shippingResponse.shippingZoneId;

    const productResponse = await commission.createProduct({ price: charge["product_price"] });
    productId = productResponse.productId;
    productPrice = productResponse.productPrice;

    const orderResponse = await commission.createOrder({
      paymentMethod: "bacs",
      paymentMethodTitle: "Direct Bank Transfer",
      setPaid: true,
      billing: {
        firstName: "John",
        lastName: "Doe",
        address1: "969 Market",
        city: "San Francisco",
        state: "CA",
        postode: "94103",
        country: "US",
        email: "john.doe@example.com",
        phone: "(555) 555-5555"
      },
      lineItems: [{ productId: productId }]
    });

    orderTotal = orderResponse.orderId;

    const total = calculateCharge({
      productPrice: Number(productPrice),
      productQuantity: 1,
      isTaxInclusive: isTaxInclusive,
      roundTaxAtSubtotal: isTaxRounded,
      taxRate: taxRate,
      shippingRate: shippingRate,
      taxOnShipping: shippingOnTax,
      allowShippingPerQuantity: false
    });

    await commission.woocommerceApi.deleteTaxRate(taxId);
    await commission.woocommerceApi.deleteShippingZone(shippingZoneId);
    await commission.woocommerceApi.deleteProduct(productId);
  }
});
