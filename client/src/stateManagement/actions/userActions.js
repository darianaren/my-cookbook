import { GUEST, MY_USER, MY_RECIPES, MY_FAVORITES, CLOSE_USER } from "../types";

export const loginGuest = () => ({ type: GUEST });

//login and update
export const myUser = (user) => ({ type: MY_USER, payload: user });

export const myRecipes = (recipes) => ({ type: MY_RECIPES, payload: recipes });

export const myFavorites = (favorites) => ({
  type: MY_FAVORITES,
  payload: favorites,
});

//logout and delete
export const closeUser = () => ({ type: CLOSE_USER });
