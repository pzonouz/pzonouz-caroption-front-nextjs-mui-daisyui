import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import authReducer from "./features/auth";
import modalReducer from "./features/modals";
import snackbarReducer from "./features/snackbar";

export const makeStore = () => {
  const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    modal: modalReducer,
    snackbar: snackbarReducer,
  });
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
