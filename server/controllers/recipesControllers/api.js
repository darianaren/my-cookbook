require("dotenv").config();
const { dataApiCache, dataApiIdCache } = require("../../helpers/helpApi"),
  { API_KEY } = process.env,
  urlApi = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`,
  urlFake = `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`;

async function getApiRecipes() {
  try {
    // const recipesApi = await dataApiCache(urlFake);
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

async function getOneFakeRecipe(id) {
  try {
    const allRecipes = await dataApiCache(urlFake);
    const idRecipe = allRecipes.find((recipe) => recipe.id === parseInt(id));
    if (!idRecipe) {
      throw "Recipe not found.";
    }
    return idRecipe;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getOneApiRecipe,
  getOneFakeRecipe,
  getApiRecipes,
};
