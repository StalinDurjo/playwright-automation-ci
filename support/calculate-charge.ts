const taxInclusive = (linePrice: number, rate: number, quantity: number) => {
  const taxRate = 1 + rate;
  const taxPerQty = Math.round((linePrice * taxRate - linePrice) * 100) / 100;
  const pricePerQtyExcTax = linePrice - taxPerQty;
  const totalTax = taxPerQty * quantity;
  const totalPriceExcTax = pricePerQtyExcTax * quantity;
  const pricePerQtyIncTax = pricePerQtyExcTax + taxPerQty;
  const totalPriceIncTax = pricePerQtyIncTax * quantity;

  return { taxPerQty, pricePerQtyExcTax, pricePerQtyIncTax, totalTax, totalPriceExcTax, totalPriceIncTax };
};

const taxExclusive = (linePrice: number, rate: number, quantity: number) => {
  const taxPerQty = Math.round(linePrice * rate * 100) / 100;
  const pricePerQtyExcTax = linePrice;
  const pricePerQtyIncTax = Math.round((taxPerQty + pricePerQtyExcTax) * 100) / 100;
  const totalTax = taxPerQty * quantity;
  const totalPriceExcTax = pricePerQtyExcTax * quantity;
  const totalPriceIncTax = pricePerQtyIncTax * quantity;

  return { taxPerQty, pricePerQtyExcTax, pricePerQtyIncTax, totalTax, totalPriceExcTax, totalPriceIncTax };
};

export const calculateCharge = ({
  productPrice,
  productQuantity = 1,
  isTaxInclusive = false,
  roundTaxAtSubtotal,
  taxRate,
  shippingRate,
  taxOnShipping = false,
  allowShippingPerQuantity = false
}: {
  productPrice?: number;
  productQuantity?: number;
  isTaxInclusive?: boolean;
  roundTaxAtSubtotal?: boolean;
  taxRate?: number;
  shippingRate?: number;
  taxOnShipping?: boolean;
  allowShippingPerQuantity?: boolean;
}) => {
  let total: number = 0;
  let perProductTax: number;
  let totalProductTax: number;
  let perShippingRate: number;
  let totalShippingTax: number;

  const inclusive = taxInclusive(9.19, 0.07, 1);
  const exclusive = taxExclusive(9.19, 0.07, 1);
  // console.log("inclusive", inclusive);
  // console.log("exclusive", exclusive);

  if(!isTaxInclusive){
    total = total + taxExclusive(productPrice, taxRate, productQuantity)['totalPriceIncTax']
  }

  console.log(taxExclusive(productPrice, taxRate, productQuantity)['totalPriceIncTax'])

  console.log(total)

  // console.log("calculate charge", {
  //   productPrice,
  //   productQuantity,
  //   isTaxInclusive,
  //   roundTaxAtSubtotal,
  //   taxRate,
  //   shippingRate,
  //   taxOnShipping,
  //   allowShippingPerQuantity
  // });

  return total;
};
