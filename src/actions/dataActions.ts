import { Dispatch } from "redux";
import * as types from "./actionTypes";

interface IMatch {
  match: object,
}

interface IDataType {
  round: number,
  matches: IMatch[]
}

export const loadDataSuccess = (payload: IDataType[]) => ({
  type: types.LOAD_DATA_SUCCESS,
  // tslint:disable-next-line:object-literal-sort-keys
  payload
})


export const loadData = () => {
  return (dispatch: Dispatch<any>) => fetchData()
    .then(res => res.json())
    .then(data => {
      // tslint:disable-next-line:no-console
      console.log('data', data)
      dispatch(loadDataSuccess(data))
    })
}

const URL = "http://localhost:3000/results";

const fetchData = () => {
  return fetch(URL, { method: 'GET'})
}