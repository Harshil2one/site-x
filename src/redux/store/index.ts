import { combineReducers, configureStore, type Action } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "../slices/cart";
import restaurantReducer from "../slices/restaurant";
import orderReducer from "../slices/order";

const appReducer = combineReducers({
  cart: cartReducer,
  restaurant: restaurantReducer,
  order: orderReducer,
});

const rootReducer = (
  state: RootState | undefined,
  action: Action
): RootState => {
  return appReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
