import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import { authentication } from "../_reducers/authentication.reducer.jsx";
import { alert } from "../_reducers/alert.reducer.jsx";

const loggerMiddleware = createLogger();
const rootReducer = combineReducers({
  authentication,
  alert
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
