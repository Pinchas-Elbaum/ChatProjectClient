// store.ts:
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice';
import analyticsReducer from './slices/analyticsSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
        analytics: analyticsReducer,
    },
});
export default store;
