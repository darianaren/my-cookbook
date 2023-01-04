import { UPDATE_URL, SEARCH, CLEAR_URL } from "../types";

const initialState = {
  url: "http://localhost:5000/recipes",
  search: "",
};

export default function urlReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_URL:
      return { ...state, url: payload };
    case SEARCH:
      return { ...state, search: payload };
    case CLEAR_URL:
      return initialState;
    default:
      return state;
  }
}
