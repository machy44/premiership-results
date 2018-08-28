import * as types from "../actions/actionTypes";
// import { IDataType } from '../actions/dataActions';
import initialState from './initialState';

export default function dataReducer(state = initialState.selected, action: any) {
  switch(action.type) {
    case types.SELECTED_ROUND_SUCCESS:
      return action.selected;
    default:
      return state;
  }
}