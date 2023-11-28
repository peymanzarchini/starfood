import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  cart: [],
};

const userSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    signOutSuccess: (state, action) => {
      state.currentUser = null;
      state.cart = [];
    },
    addCart: (state, action) => {
      let existProduct = state.cart.filter((item) => item.id === action.payload.id);
      if (existProduct < 1) {
        state.cart.push(action.payload);
      } else {
        alert("This product has already been added to the shopping cart.");
        return state;
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
      if (itemInCart.quantity === 1) {
        itemInCart.quantity = 1;
      } else {
        itemInCart.quantity--;
      }
    },
  },
});

export const { addCart, removeCart, increase, decrease, signInSuccess, signOutSuccess } =
  userSlice.actions;
export default userSlice.reducer;
