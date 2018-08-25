import * as types from "../actions/actionTypes";

export default function dataReducer(state = [], action: any) {
  switch(action.type) {
    case types.LOAD_DATA_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}