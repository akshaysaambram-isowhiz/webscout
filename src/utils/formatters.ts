export const formatPrice = (price: number, currencySymbol: string = "$") =>
  `${currencySymbol} ${price.toFixed(2)}`;

export const toTitleCase = (str: string) =>
  str
    .toLowerCase()
    .replace("-", " ")
    .split(" ")
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .join(" ");
