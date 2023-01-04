import { DARK_THEME, LIGHT_THEME } from "../types";

const initialState = {
  theme: "light",
};

export default function themeReducer(state = initialState, action) {
  switch (action.type) {
    case DARK_THEME:
      return { theme: "dark" };

    case LIGHT_THEME:
      return { theme: "light" };

    default:
      return state;
  }
}
