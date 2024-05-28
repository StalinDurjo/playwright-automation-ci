// Silence is golden

import { calculateCharge } from "support/calculate-charge/calculate-charge";
import CommissionUtility from "support/mock-utility/commission-utility";
import { toBoolean } from "support/utils/utils";

async function runTest() {
  let isTaxInclusive: boolean;
  let isTaxRounded: boolean;

  let taxId: number;
  let taxRate: number;
  let shippingOnTax: number;
  let shippingRate: number;
  let shippingZoneId: number;
  let productId: number;
  let productPrice: string;

  const baseUrl = "http://localhost:9999/";
  const commission = new CommissionUtility({ baseUrl });
  commission.setBasicAuth("admin", "password");

  await commission.woocommerceApi.enableTax(true);
  //   await commission.woocommerceApi.setBasicAuth("admin", "password");
  for (const charge of (await commission.getAllLineItemCharges()) as Object[]) {
    // isTaxInclusive = await commission.setTaxInclusive(toBoolean(charge["is_tax_inclusive"]));
    // isTaxRounded = await commission.setTaxRounding(toBoolean(charge["tax_round_at_subtotal"]));

    // const taxResponse = await commission.setTax({ rate: charge["tax_rate"], taxOnShipping: toBoolean(charge["tax_on_shipping"]) });
    // taxId = taxResponse.id;
    // taxRate = taxResponse.rate;
    // shippingOnTax = taxResponse.shipping;

    // const shippingResponse = await commission.setShipping({ name: "another test", cost: "5", shippingPerQty: false, taxOnShipping: toBoolean(charge["tax_on_shipping"]) });
    // shippingRate = shippingResponse.shippingRate;
    // shippingZoneId = shippingResponse.shippingZoneId;

    // const productResponse = await commission.createProduct({ price: charge["product_price"] });
    // productId = productResponse.productId;
    // productPrice = productResponse.productPrice;

    await commission.woocommerceApi.createOrder({ paymentMethod: "test", billing: { firstName: "test name" }, lineItems: [{ productId: 2 }] });

    console.log(charge);
  }

  //   const total = calculateCharge({
  //     productPrice: 20,
  //     productQuantity: 1,
  //     isTaxInclusive: false,
  //     roundTaxAtSubtotal: false,
  //     taxRate: 4,
  //     shippingTax: 5,
  //     taxOnShipping: false,
  //     allowShippingPerQuantity: false
  //   });
}

runTest();
