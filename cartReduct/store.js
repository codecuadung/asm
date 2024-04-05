import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducer";
import favoriteReducer from "./reducerFavorite"; // Import reducer mới

const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorite: favoriteReducer, // Thêm reducer yêu thích và gán cho key là "favorite"
  },
});

export default store;
