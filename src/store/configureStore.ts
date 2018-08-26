import { AnyAction, applyMiddleware, createStore,  } from "redux";
import logger from 'redux-logger';
import thunk, { ThunkDispatch } from "redux-thunk";
import rootReducer from "../reducers";
// tslint:disable-next-line:ordered-imports
import { loadData } from "../actions/dataActions";

export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
  );
  (store.dispatch as ThunkDispatch<any, void, AnyAction>)( loadData() );
}
