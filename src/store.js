import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';
import { persistReducer, persistStore } from "redux-persist";


const cartPersistConfig = {
    key: 'cart',
    storage,
};

const userPersistConfig = {
    key: 'user',
    storage,
    blacklist: ['status', 'error'],
}

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

const rootReducer = combineReducers({
    user: persistedUserReducer,
    cart: persistedCartReducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
})

export const persistor = persistStore(store);

export default store;