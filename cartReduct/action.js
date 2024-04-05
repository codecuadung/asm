// Trong file action.js

import { createAction } from "@reduxjs/toolkit";

export const addToCart = createAction('cart/addToCart');
export const increaseQuantity = createAction('cart/increaseQuantity');
export const decreaseQuantity = createAction('cart/decreaseQuantity');
export const removeCart = createAction('cart/removeCart');
export const addToFavorite = createAction('favorite/addToFavorite');