import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsSlice from "./admin/products-slice";
import adminOrderSlice from "./admin/order-slice";
import adminContactSlice from "./admin/contact-slice";
import adminUsersSlice from "./admin/users-slice";
import shopProductsSlice from "./shop/products-slice";
import shopCartSlice from "./shop/cart-slice";
import shopAddressSlice from "./shop/address-slice";
import shopOrderSlice from "./shop/order-slice";
import shopSearchSlice from "./shop/search-slice";
import shopReviewSlice from "./shop/review-slice";
import shopContactSlice from "./shop/contact-slice";
import commonFeatureSlice from "./common-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,

    adminProducts: adminProductsSlice,
    adminOrder: adminOrderSlice,
    adminContact: adminContactSlice,
    adminUsers: adminUsersSlice,

    shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSearchSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,
    shopContact: shopContactSlice,

    commonFeature: commonFeatureSlice,
  },
});

export default store;
