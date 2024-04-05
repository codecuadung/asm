// Trong file reducerFavorite.js

import { createReducer } from '@reduxjs/toolkit';
import { addToFavorite } from './action';

const initialState = {
  favoriteItems: [],
};

const favoriteReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToFavorite, (state, action) => {
      const newItem = action.payload;
      const existingItem = state.favoriteItems.find(item => item.idSP === newItem.idSP);

      if (!existingItem) {
        state.favoriteItems.push(newItem); // Thêm sản phẩm vào danh sách yêu thích nếu chưa tồn tại
      }
    });
});

export default favoriteReducer;
