// import { Dispatch } from "redux";
import * as types from "./actionTypes";

// export interface IRound {
//   selected: number,
// }

export const selectedRoundSuccess = (selected: any) => ({
  type: types.SELECTED_ROUND_SUCCESS,
  // tslint:disable-next-line:object-literal-sort-keys
  selected
})

export const selectRound = (selected: any) => {
  return selectedRoundSuccess(selected)
}