require("dotenv").config();
const { dataApiCache, dataApiIdCache } = require("../../helpers/helpApi"),
  { API_KEY } = process.env,
  urlApi = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`;

async function getApiRecipes() {
  try {
    const recipesApi = await dataApiCache(urlApi);
    return recipesApi;
  } catch (error) {
    throw error;
  }
}

async function getOneApiRecipe(id) {
  try {
    const recipeApi = await dataApiIdCache(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    return recipeApi;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getOneApiRecipe,
  getApiRecipes,
};
