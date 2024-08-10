import { createSlice } from "@reduxjs/toolkit";

export interface Icart {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}
[];

const initialState: {
  cart: Icart[];
} = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      let existProduct = state.cart.find((item) => item.id === action.payload.id);
      if (!existProduct) {
        state.cart.push(action.payload);
      } else {
        alert("This product has already been added to the shopping cart.");
      }
    },
    removeCart: (state, action) => {
      const { id } = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
    },
    increase: (state, action) => {
      const { id } = action.payload;
      const itemInCart = state.cart.find((item) => item.id === id);
      if (itemInCart) {
        itemInCart.quantity++;
      }
    },
    decrease: (state, action) => {
      const { id } = action.payload;
      const itemInCart = state.cart.find((item) => item.id === id);
      if (itemInCart?.quantity === 1) {
        itemInCart.quantity = 1;
      } else {
        itemInCart!.quantity--;
      }
    },
  },
});

export const { addCart, removeCart, increase, decrease } = cartSlice.actions;

export default cartSlice.reducer;
