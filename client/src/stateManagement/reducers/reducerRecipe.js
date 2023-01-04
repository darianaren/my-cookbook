import {
  ORIGINAL_RECIPES,
  ALL_RECIPES,
  ONE_RECIPE,
  ITEMS_PER_PAGE,
  CURRENT_PAGE,
  FILTERS,
  FILTERED_RECIPES,
} from "../types";

const initialState = {
  originalRecipes: [],
  allRecipes: [],
  oneRecipe: {},
  recipesPerPage: [],
  currentPage: 1,
  activeFilters: {},
};

export default function recipeReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ORIGINAL_RECIPES:
      return { ...state, originalRecipes: payload };
    case ALL_RECIPES:
      return { ...state, allRecipes: payload };
    case ONE_RECIPE:
      return { ...state, oneRecipe: payload };
    case ITEMS_PER_PAGE:
      const itemsPerPage = state.allRecipes.slice(payload.min, payload.max);
      return { ...state, recipesPerPage: itemsPerPage };
    case CURRENT_PAGE:
      return { ...state, currentPage: payload };
    case FILTERS:
      return { ...state, activeFilters: payload };
    case FILTERED_RECIPES:
      const { order, time, health, cuisines, diets } = state.activeFilters;
      let filteredRecipes = [...state.originalRecipes];

      if (order) {
        if (order === "az") {
          filteredRecipes.sort((x, y) => x.title.localeCompare(y.title));
        } else if (order === "za") {
          filteredRecipes
            .sort((x, y) => x.title.localeCompare(y.title))
            .reverse();
        } else if (order === "high") {
          filteredRecipes
            .sort((x, y) => x.healthScore - y.healthScore)
            .reverse();
        } else if (order === "less") {
          filteredRecipes.sort((x, y) => x.healthScore - y.healthScore);
        } else if (order === "quick") {
          filteredRecipes.sort((x, y) => x.time - y.time);
        } else if (order === "slow") {
          filteredRecipes.sort((x, y) => x.time - y.time).reverse();
        }
      }
      if (time > 0) {
        filteredRecipes = filteredRecipes.filter(
          (recipe) => recipe.time <= time
        );
      }
      if (health > 0 && health <= 100) {
        filteredRecipes = filteredRecipes.filter(
          (recipe) => recipe.healthScore >= health
        );
      }
      if (cuisines) {
        filteredRecipes = filteredRecipes.filter((recipe) =>
          recipe.cuisines.includes(decodeURI(cuisines))
        );
      }
      if (Object.keys(diets).length > 0) {
        for (let diet in diets) {
          if (diets[diet]) {
            filteredRecipes = filteredRecipes.filter((recipe) =>
              recipe.Diets.find((recipeDiet) => recipeDiet.name === diet)
            );
          }
        }
      }
      return { ...state, allRecipes: filteredRecipes };
    default:
      return state;
  }
}
