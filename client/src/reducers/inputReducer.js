import {
  ADD_INPUT,
  GET_INPUTS,
  SET_LOADING,
  DELETE_INPUT,
  SET_CURRENT,
  EDIT_INPUT,
  INPUTS_ERROR,
} from "../actions/types";

const intialState = {
  list: null,
  editItem: {},
  editMode: false,
  loading: false,
  error: null,
};

export default (state = intialState, action) => {
  switch (action.type) {
    case GET_INPUTS:
      return {
        ...state,
        list: action.payload,
        loading: false,
        error: null,
      };

    case SET_LOADING:
      return {...state, loading: true};

    case ADD_INPUT:
      return {
        ...state,
        list: [
          ...state.list,
          {
            name: action.name,
            content: action.content,
            price: action.price,
          },
        ],
        loading: false,
        error: null,
      };

    case DELETE_INPUT:
      return {
        ...state,
        list: [...state.list.filter((input) => input.id !== action.payload)],
        loading: false,
        error: null,
      };

    case EDIT_INPUT:
      return {
        list: [
          ...state.list.filter((input) => input.id !== action.payload.id),
          {
            id: action.payload.id,
            name: action.payload.name,
            content: action.payload.content,
            price: action.payload.price,
          },
        ],
        editMode: false,
        editItem: {},
        loading: false,
        error: null,
      };

    case SET_CURRENT:
      return {
        ...state,
        editItem: action.payload,
        loading: false,
        editMode: true,
      };

    case INPUTS_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
