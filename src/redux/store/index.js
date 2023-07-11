import { configureStore ,combineReducers} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calApis } from '../apiSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const appReducer = combineReducers({
    [calApis.reducerPath]: calApis.reducer,
})
const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: true,
        immutableCheck: true,
    }).concat(calApis.middleware),
})
setupListeners(store.dispatch)

export const persistor = persistStore(store);

