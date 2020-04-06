import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import tasksReducer from './tasks/tasks.reducer';
import userReducer from './user/user.reducer';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "tasks"] //array containing the name of reducer we want to persist
};

const rootReducer = combineReducers({
  tasks: tasksReducer,
  user: userReducer
});

export default persistReducer(persistConfig, rootReducer);
