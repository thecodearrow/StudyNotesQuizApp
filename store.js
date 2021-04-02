import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './reducers'
import AsyncStorage from "react-native"
import logger from 'redux-logger'


/*
const persistConfig = {
    version: 1,
    key: 'user',
    storage: AsyncStorage,
}


// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Redux: Store
const store = createStore(
    persistedReducer,
    /*applyMiddleware(
    createLogger()
    ),
);
// Middleware: Redux Persist Persister
let persistor = persistStore(store);
// Exports

*/
const store = createStore(rootReducer, applyMiddleware(logger));

export { store };

