import { SOUND_ON, SOUND_OFF } from "../types";

import music from "../../assets/music.mp3";

const initialState = {
  audio: new Audio(music),
  sound: false,
};

export default function soundReducer(state = initialState, action) {
  switch (action.type) {
    case SOUND_ON:
      return { ...state, sound: true };
    case SOUND_OFF:
      return { ...state, sound: false };
    default:
      return state;
  }
}
