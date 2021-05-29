import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const {
    state: { filteredProducts, gridView },
  } = useFilterContext();

  if (filteredProducts.length < 1) {
    return <h4>Sorry, no products to display...</h4>;
  }

  if (!gridView) {
    return <ListView filteredProducts={filteredProducts} />;
  }

  return <GridView filteredProducts={filteredProducts} />;
};

export default ProductList;
