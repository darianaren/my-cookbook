import { NEW_MESSAGE, HIDDEN_MESSAGE } from "../types";

export const newMessage = (message, stateMsg) => ({
  type: NEW_MESSAGE,
  payload: message,
  stateMsg,
});

export const hiddenMessage = () => ({
  type: HIDDEN_MESSAGE,
});
