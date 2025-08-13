import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
       addToCart: (state, action) => {
         
         const existedProduct = state.cartProducts.find(item => {
          return item.p?._id === action.payload?.p?._id
        });
        if (existedProduct) {
          existedProduct.quantity++
        } else {
          state.cartProducts.push({...action.payload, quantity: 1, productId: action.payload._id});
        }
        } ,
    removeFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(item => item.p?._id !== action.payload.p?._id);
    },
    removeAll: (state, action) => {
      state.cartProducts = [];
    },
    changeQuantity: (state, action) => {
      const existedProduct = state.cartProducts.find(item => {
          return item.p?._id === action.payload?.p?._id
      });
      if (existedProduct) {
        existedProduct.quantity = action.payload.quantity
      }
    }
  }
})

export const { addToCart, removeFromCart, removeAll, changeQuantity } = cartSlice.actions;
export default cartSlice.reducer