import {
  ORIGINAL_RECIPES,
  ALL_RECIPES,
  ONE_RECIPE,
  ITEMS_PER_PAGE,
  CURRENT_PAGE,
  FILTERED_RECIPES,
  FILTERS,
} from "../types";

export const originalRecipes = (recipes) => ({
  type: ORIGINAL_RECIPES,
  payload: recipes,
});

export const getAllRecipes = (recipes) => ({
  type: ALL_RECIPES,
  payload: recipes,
});

export const getOneRecipe = (recipe) => ({
  type: ONE_RECIPE,
  payload: recipe,
});

export const itemsPerPage = (min, max) => ({
  type: ITEMS_PER_PAGE,
  payload: { min, max },
});

export const currentPg = (page) => ({
  type: CURRENT_PAGE,
  payload: page,
});

export const filters = (filters) => ({ type: FILTERS, payload: filters });

export const filteredRecipes = () => ({
  type: FILTERED_RECIPES,
});
