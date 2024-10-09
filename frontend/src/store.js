import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slice/api.js';
import authSliceReducer from './slice/auth.js';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;