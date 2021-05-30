import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPriceValue = action.payload.map((p) => p.price);
    maxPriceValue = Math.max(...maxPriceValue);
    return {
      ...state,
      allProducts: [...action.payload],
      filteredProducts: [...action.payload],
      filters: {
        ...state.filters,
        maxPrice: maxPriceValue,
        price: maxPriceValue,
      },
    };
  }
  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      gridView: false,
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      gridView: true,
    };
  }
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    };
  }
  if (action.type === SORT_PRODUCTS) {
    let tempProducts = [...state.filteredProducts];
    const { sort } = state;
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
    return {
      ...state,
      filteredProducts: tempProducts,
    };
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return {
      ...state,
      filters: {
        ...state.filters,
        [name]: value,
      },
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        text: "",
        category: "all",
        company: "all",
        colors: "all",
        price: state.filters.maxPrice,
        freeShipping: false,
      },
    };
  }
  if (action.type === FILTER_PRODUCTS) {
    const { allProducts } = state;
    const { text, category, company, colors, price, freeShipping } =
      state.filters;
    let tempProducts = [...allProducts];
    // FILTERING
    if (text) {
      tempProducts = tempProducts.filter(
        (product) => product.name.indexOf(text.trim()) > -1
      );
    }
    if (category !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      );
    }
    if (company !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.company === company
      );
    }
    if (colors !== "all") {
      tempProducts = tempProducts.filter((product) =>
        product.colors.includes(colors)
      );
    }
    if (price >= 0) {
      tempProducts = tempProducts.filter((product) => product.price <= price);
    }
    if (freeShipping) {
      tempProducts = tempProducts.filter((product) => product.shipping);
    }

    return { ...state, filteredProducts: tempProducts };
  }
  // return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
