import { configureStore } from "@reduxjs/toolkit";
import  { ProductData, ProductSlice } from "./reducers/productSlice";
import { userData, UserSlice } from "./reducers/userSlice";
export interface ApplicationState {
  user: userData;
  product:ProductData

}
export function makeStore() {
  return configureStore({
    reducer: {
      user: UserSlice.reducer,
      product: ProductSlice.reducer,
    },
  });
}

const store = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
