export const formatCurrency = (number: number) => {
  const currencyFormatter = Intl.NumberFormat("ar-sa", {
    currency: "SAR",
    style: "currency",
    numberingSystem: "latn"
  });
  return currencyFormatter.format(number);
};
