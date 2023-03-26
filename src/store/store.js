import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/users/userSlice';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
    version: 1
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        connectedUser: persistedReducer
    }
});

export const persistor = persistStore(store);
