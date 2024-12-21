export const formatPrice = (price: number, currencySymbol: string = "$") =>
  `${currencySymbol} ${price.toFixed(2)}`;
