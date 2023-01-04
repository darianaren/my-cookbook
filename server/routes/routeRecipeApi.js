const { Router } = require("express"),
  {
    getOneApiRecipe,
    getOneFakeRecipe,
    getRecipes,
  } = require("../controllers/ctrlRecipe"),
  routerRecipeApi = Router();

routerRecipeApi

  .get("/", async (req, res) => {
    try {
      const { title } = req.query;
      const recipes = await getRecipes("api", title);
      res.json(recipes);
    } catch (error) {
      res.status(404).json({ error });
    }
  })
  .get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const recipe = await getOneApiRecipe(id);
      // const recipe = await getOneFakeRecipe(id);
      res.json(recipe);
    } catch (error) {
      res.status(404).json({ error });
    }
  });

module.exports = routerRecipeApi;
