// Silence is golden

import { calculateCharge } from "./support/calculate-charge";

calculateCharge({
  productPrice: 100,
  productQuantity: 2,
  isTaxInclusive: false,
  roundTaxAtSubtotal: false,
  taxRate: 0.05,
  shippingRate: 10,
  taxOnShipping: true,
  allowShippingPerQuantity: true
})