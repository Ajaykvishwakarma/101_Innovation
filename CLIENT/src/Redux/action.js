import { LOADING,FETCH_DATA,  DELETE_DATA, PERTICULAR_DATA  } from './actionTypes';


export const setLoading = (payload) => ({ type: LOADING, payload})
export const setData = (payload) => ({ type: FETCH_DATA, payload})
export const setPrticularData = (payload) => ({ type: PERTICULAR_DATA, payload})

export const fetchData = (url) => async (dispatch) => {

    dispatch(setLoading(true))
    const a = await fetch(url, {
        method : "GET",
    })
    const res = await a.json()
    const data = res;
    dispatch(setLoading(false))
    dispatch(setData(data))

}

export const deleteData = (url) => async (dispatch) => {

    dispatch(setLoading(true))
    const a = await fetch(url, {
        method : "DELETE",
    })
    const b = await fetch("https://innovationer.herokuapp.com/foods", {
        method : "GET",
    })
    const res = await b.json()
    const data = res;
    dispatch(setLoading(false))
    dispatch(setData(data))

}

export const deleteFavData = (url) => async (dispatch) => {

    dispatch(setLoading(true))
    const a = await fetch(url, {
        method : "DELETE",
    })
    const b = await fetch("https://innovationer.herokuapp.com/favorites", {
        method : "GET",
    })
    const res = await b.json()
    const data = res;
    dispatch(setLoading(false))
    dispatch(setData(data))

}

export const perticularData = (url) => async (dispatch) => {

    const token = JSON.parse(localStorage.getItem('token'))
    dispatch(setLoading(true))
    const a = await fetch(url, {
        method : "GET",
    })
    const res = await a.json()
    const data = res;
    dispatch(setLoading(false))
    dispatch(setPrticularData(data))

}