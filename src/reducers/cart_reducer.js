import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, singleProduct } = action.payload;
    const tempItem = state.cart.find((item) => item.id === id + color);
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + color,
        name: singleProduct.name,
        color,
        amount,
        image: singleProduct.images[0].url,
        price: singleProduct.price,
        max: singleProduct.stock,
      };
      return {
        ...state,
        cart: [...state.cart, newItem],
      };
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter(
      (cartItem) => cartItem.id !== action.payload
    );
    return { ...state, cart: tempCart };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  // TOGGLE
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === id) {
        if (value === "INCREASE") {
          if (cartItem.amount < cartItem.max) {
            return { ...cartItem, amount: cartItem.amount + 1 };
          } else {
            return cartItem;
          }
        }
        if (value === "DECREASE") {
          if (cartItem.amount > 1) {
            return { ...cartItem, amount: cartItem.amount - 1 };
          } else {
            return cartItem;
          }
        }
      } else {
        return cartItem;
      }
    });
    return { ...state, cart: tempCart };
  }
  // CART TOTAL
  if (action.type === COUNT_CART_TOTALS) {
    const tempTotalItems = state.cart
      .map((cartItem) => cartItem.amount)
      .reduce((curValue, acc) => curValue + acc, 0);
    const tempTotalAmount = state.cart
      .map((cartItem) => cartItem.price * cartItem.amount)
      .reduce((curValue, acc) => curValue + acc, 0);
    return {
      ...state,
      totalItems: tempTotalItems,
      totalAmount: tempTotalAmount,
    };
  }

  // return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
