const { Router } = require("express"),
  routerRecipeDb = Router();

const {
    getOneDbRecipe,
    postDbRecipe,
    updateDbRecipe,
    deleteDbRecipe,
  } = require("../../controllers/recipesControllers/db"),
  { getRecipes } = require("../../controllers/recipesControllers/all");

routerRecipeDb
  .get("/", async (req, res) => {
    try {
      const { title } = req.query;
      const recipes = await getRecipes("db", title);
      res.json(recipes);
    } catch (error) {
      res.status(404).json({ error });
    }
  })
  .get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const recipe = await getOneDbRecipe(id);
      res.json(recipe);
    } catch (error) {
      res.status(404).json({ error });
    }
  })
  .post("/", async (req, res) => {
    try {
      const newRecipe = await postDbRecipe(req.body);
      res.json(newRecipe);
    } catch (error) {
      res.status(400).json({ error });
    }
  })
  .put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const recipe = await updateDbRecipe(id, req.body);
      res.json(recipe);
    } catch (error) {
      res.status(404).json({ error });
    }
  })
  .delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const recipe = await deleteDbRecipe(id);
      res.json(recipe);
    } catch (error) {
      res.json({ error });
    }
  });

module.exports = routerRecipeDb;
