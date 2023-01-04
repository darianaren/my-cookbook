import { GET_DIETS } from "../types";

const initialState = {
  diets: [],
};

export default function dietsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DIETS:
      return { ...state, recipes: payload };
    default:
      return state;
  }
}
