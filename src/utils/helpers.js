export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(number / 100);
};

export const getUniqueValues = (products, type) => {
  let newProducts = [];
  if (type === "colors") {
    products.map((product) =>
      product[type].map((item) => newProducts.push(item))
    );
  } else {
    newProducts = products.map((product) => product[type]);
  }
  return ["all", ...new Set(newProducts)];
};
