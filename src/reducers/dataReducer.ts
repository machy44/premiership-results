import * as types from "../actions/actionTypes";
// import { IDataType } from '../actions/dataActions';
import initialState from './initialState';


// interface IDataAction {
//   type: string,
//   payload: IDataType[],
// }

export default function dataReducer(state = initialState.data, action: any) {
  switch(action.type) {
    case types.LOAD_DATA_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
