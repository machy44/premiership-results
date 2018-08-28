import { applyMiddleware, createStore,  } from "redux";
import logger from 'redux-logger';
import thunk from "redux-thunk";
import rootReducer from "../reducers";
// tslint:disable-next-line:ordered-imports
// import { loadData } from "../actions/dataActions";

export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
  );
}
