const axios = require("axios");

function cacheFunction(callback) {
  const cache = {};
  return async function (arg) {
    if (cache.hasOwnProperty(arg)) {
      return cache[arg];
    }
    cache[arg] = await callback(arg);
    return cache[arg];
  };
}

async function allDataApi(url) {
  try {
    const recipes = await axios.get(url, {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    });

    const recipeApi = recipes.data.results.map((recipe) => {
      const instructions = [];
      recipe.analyzedInstructions[0]?.steps.forEach((detail) => {
        instructions.push(detail.step);
      });
      return {
        id: recipe.id,
        title: recipe.title,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        time: recipe.readyInMinutes,
        servings: recipe.servings,
        image: recipe.image,
        cuisines: recipe.cuisines,
        dishTypes: recipe.dishTypes,
        Diets: recipe.diets.map((detail) => {
          return { name: detail };
        }),
        occasions: recipe.occasions,
        instructions,
      };
    });
    return recipeApi;
  } catch (error) {
    throw "Recipes not found.";
  }
}

async function dataApiId(url) {
  try {
    const instructions = [];

    const recipe = await axios.get(url, {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    });

    const detail = await recipe.data;

    detail.analyzedInstructions[0]?.steps.forEach((info) => {
      instructions.push(info.step);
    });
    return {
      id: detail.id,
      title: detail.title,
      summary: detail.summary,
      healthScore: detail.healthScore,
      ingredients: detail.extendedIngredients.map((i) => i.original),
      time: detail.readyInMinutes,
      servings: detail.servings,
      image: detail.image,
      cuisines: detail.cuisines,
      dishTypes: detail.dishTypes,
      Diets: detail.diets.map((detail) => {
        return { name: detail };
      }),
      occasions: detail.occasions,
      instructions,
    };
  } catch (error) {
    throw "Recipe not found.";
  }
}

async function dietsApi(url) {
  try {
    const recipes = await axios.get(url, {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    });
    const dietsApi = recipes.data.results.map((recipe) => {
      return recipe.diets;
    });
    return dietsApi;
  } catch (error) {
    throw error;
  }
}

const dataApiCache = cacheFunction(allDataApi),
  dataApiIdCache = cacheFunction(dataApiId),
  dietsApiCache = cacheFunction(dietsApi);

module.exports = { dataApiCache, dataApiIdCache, dietsApiCache };
