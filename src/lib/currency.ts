export const USD_TO_INR = 83.5;

export const formatPrice = (priceInUSD: number): string => {
  const priceInINR = priceInUSD * USD_TO_INR;
  return `₹${priceInINR.toFixed(2)}`;
};

export const convertToINR = (priceInUSD: number): number => {
  return priceInUSD * USD_TO_INR;
};

export const formatCartTotal = (priceInUSD: number): string => {
  return formatPrice(priceInUSD);
};
