import { createStore, applyMiddleware } from 'redux';
import { persistStore } from "redux-persist";
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './root.reducer';

const loggerMiddleware = createLogger();

const middlewares = [thunkMiddleware];

if ('development' === process.env.NODE_ENV) {
  middlewares.push(loggerMiddleware);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);

export { store, persistor };
