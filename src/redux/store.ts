import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";
export const store = configureStore({
  reducer: { [baseApi.reducerPath]: baseApi.reducer },
  middleware: (defaultMiddlewares) =>
    defaultMiddlewares().concat(baseApi.middleware),
});
