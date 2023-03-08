import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {coordinatesAPI} from "../services/coordinates-service";
import {clientsApi} from '../services/clients-service';
import {configApi} from '../services/config-service';

const rootReducer = combineReducers({
    [coordinatesAPI.reducerPath]: coordinatesAPI.reducer,
    [clientsApi.reducerPath]: clientsApi.reducer,
    [configApi.reducerPath]: configApi.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(
                coordinatesAPI.middleware, clientsApi.middleware, configApi.middleware
            )
        }
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']