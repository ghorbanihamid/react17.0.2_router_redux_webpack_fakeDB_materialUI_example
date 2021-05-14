import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools }          from "redux-devtools-extension";
import { createLogger }                 from 'redux-logger';
import reduxThunk                       from "redux-thunk";
import rootReducer                      from "../reducers/rootReducer";

const thunkMiddleware = [reduxThunk];
const reduxLogger = createLogger();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...thunkMiddleware,reduxLogger))
);

export default store;
