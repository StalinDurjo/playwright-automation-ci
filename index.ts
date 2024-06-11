// Silence is golden

import { calculateCharge } from "support/calculate-charge";

calculateCharge({
    productPrice: 100,
    productQuantity: 1,
    isTaxInclusive: false,
    roundTaxAtSubtotal: true,
    taxRate: 0.05,
    shippingRate: 5,
    taxOnShipping: true,
    allowShippingPerQuantity: true
})