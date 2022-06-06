import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../features/auth/authSlice'
import { cryptoApi } from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";
import { cryptoExchangesApi} from "../services/cryptoExchangesApi"

export default configureStore({
  reducer: {
    auth: authReducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [cryptoExchangesApi.reducerPath]: cryptoExchangesApi.reducer,
  },

})