import { CONFIMATION_WINDOW_OPEN, CONFIMATION_WINDOW_CLOSE } from "../types";

const initialState = {
  confirmationWindow: "invisible",
};

export default function confirmationReducer(state = initialState, action) {
  switch (action.type) {
    case CONFIMATION_WINDOW_OPEN:
      return { ...state, confirmationWindow: "visible" };
    case CONFIMATION_WINDOW_CLOSE:
      return { ...state, confirmationWindow: "invisible" };
    default:
      return state;
  }
}
