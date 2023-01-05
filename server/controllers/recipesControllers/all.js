require("dotenv").config();
const { getApiRecipes } = require("./api"),
  { getDbRecipes } = require("./db");

async function getAllRecipes() {
  const apiRecipes = await getApiRecipes();
  const dbRecipes = await getDbRecipes();
  return [...dbRecipes, ...apiRecipes];
}

async function getRecipes(method, title) {
  try {
    let allApiRecipes;
    if (method === "api") {
      allApiRecipes = await getApiRecipes();
    } else if (method === "db") {
      allApiRecipes = await getDbRecipes();
    } else if (method === "all") {
      allApiRecipes = await getAllRecipes();
    }
    if (title) {
      const myTitle = decodeURI(title);
      allApiRecipes = await allApiRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(myTitle.toLowerCase())
      );
    }

    return allApiRecipes;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRecipes,
};
