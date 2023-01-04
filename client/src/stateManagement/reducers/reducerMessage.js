import { NEW_MESSAGE, HIDDEN_MESSAGE } from "../types";

const initialState = {
  success: null,
  error: null,
  className: "msg-hidden",
};

export default function messageReducer(state = initialState, action) {
  const { type, payload, stateMsg } = action;
  switch (type) {
    case NEW_MESSAGE:
      if (stateMsg === "error") {
        return { success: null, error: payload, className: "msg-show" };
      } else {
        return { success: payload, error: null, className: "msg-show" };
      }
    case HIDDEN_MESSAGE:
      return { ...state, className: "msg-hidden" };
    default:
      return state;
  }
}
