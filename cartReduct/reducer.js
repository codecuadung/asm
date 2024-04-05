// reducer.js
import { createReducer } from '@reduxjs/toolkit';
import { addToCart } from './action';
import { removeCart } from './action';
import { increaseQuantity, decreaseQuantity } from './action';

const initialState = {
  cartItems: [],
  
};

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToCart, (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item.idSP === newItem.idSP);

      if (existingItem) {
        existingItem.count += 1; // Tăng số lượng nếu sản phẩm đã tồn tại trong giỏ hàng
      } else {
        state.cartItems.push(newItem); // Thêm sản phẩm mới vào giỏ hàng
      }
    })
    .addCase(increaseQuantity, (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find(item => item.idSP === itemId);

      if (item) {
        item.count += 1; // Tăng số lượng sản phẩm
      }
    })
    .addCase(decreaseQuantity, (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find(item => item.idSP === itemId);

      if (item && item.count > 1) {
        item.count -= 1; // Giảm số lượng sản phẩm, nhưng không thể nhỏ hơn 0
      }
    })
    .addCase(removeCart, (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.idSP !== itemId);
    })
    

});

export default cartReducer;
