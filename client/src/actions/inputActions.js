import {
  ADD_INPUT,
  SET_LOADING,
  GET_INPUTS,
  DELETE_INPUT,
  EDIT_INPUT,
  SET_CURRENT,
  INPUTS_ERROR,
} from "./types";

const http = "http://localhost:7070/api/services/";

// GET INPUTS
export const getInputs = () => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`${http}`);

    const data = await res.json();
    console.log(data);
    dispatch({
      type: GET_INPUTS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: INPUTS_ERROR,
      payload: err,
    });
  }
};

// ADD NEW INPUT
export const addInput = (name, price, content) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`${http}`, {
      method: "POST",
      body: JSON.stringify({name, price, content}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    dispatch({
      type: ADD_INPUT,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: INPUTS_ERROR,
      payload: err,
    });
  }
};

//DELETE INPUT
export const deleteInput = (id) => async (dispatch) => {
  try {
    setLoading();

    await fetch(`http://localhost:7070/api/serviced/:${id}`, {
      method: "DELETE",
    });

    dispatch({
      type: DELETE_INPUT,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: INPUTS_ERROR,
      payload: err,
    });
  }
};

//SET CURRENT
export const setCurrent = (id) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`${http}${id}`);
    const data = await res.json();

    dispatch({
      type: SET_CURRENT,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: INPUTS_ERROR,
      payload: err,
    });
  }
};

// EDIT INPUT
export const editInput = (id, name, price, content) => async (dispatch) => {
  const editeInput = {id, name, price, content};
  try {
    setLoading();

    const res = await fetch(`${http}`, {
      method: "POST",
      body: JSON.stringify(editeInput),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: EDIT_INPUT,
      payload: editeInput,
    });
  } catch (err) {
    dispatch({
      type: INPUTS_ERROR,
      payload: err,
    });
  }
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
