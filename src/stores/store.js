import { configureStore } from '@reduxjs/toolkit';
import shopifyReducer from './shopify';
import userReducer from './user';

export default configureStore({
  reducer: {
    user: userReducer,
    shopify: shopifyReducer,
  },
});
