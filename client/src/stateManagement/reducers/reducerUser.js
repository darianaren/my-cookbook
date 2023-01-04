import { GUEST, MY_USER, MY_RECIPES, MY_FAVORITES, CLOSE_USER } from "../types";

const initialState = {
  guest: false,
  user: null,
  recipesUser: [],
  recipesFavorites: [],
};

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GUEST:
      return { ...state, guest: true };
    case MY_USER:
      return { ...state, guest: false, user: payload };
    case MY_RECIPES:
      return { ...state, recipesUser: payload };
    case MY_FAVORITES:
      return { ...state, recipesFavorites: payload };
    case CLOSE_USER:
      return initialState;
    default:
      return state;
  }
}
