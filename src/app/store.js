import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import categoryReducer from "../features/category/categorySlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import orderReducer from "../features/order/orderSlice";
import productReducer from "../features/product/productSlice";
import reviewReducer from "../features/review/reviewSlice";
import userReducer from "../features/user/userSlice";
// import wishlistReducer from "../features/wishlist/wishlistSlice";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  product: productReducer,
  order: orderReducer,
  category: categoryReducer,
  // wishlist: wishlistReducer,
  review: reviewReducer,
  dashboard: dashboardReducer,
});

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
