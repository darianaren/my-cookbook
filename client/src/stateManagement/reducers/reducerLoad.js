import { LOAD_ON, LOAD_OFF } from "../types";

const initialState = {
  load: "invisible",
};
export default function loadReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ON:
      return { ...state, load: "visible" };
    case LOAD_OFF:
      return { ...state, load: "invisible" };
    default:
      return state;
  }
}
