const { Router } = require("express"),
  {
    getOneApiRecipe,
    getOneFakeRecipe,
    getOneDbRecipe,
    getRecipes,
  } = require("../controllers/ctrlRecipe"),
  routerRecipe = Router();

routerRecipe
  .get("/", async (req, res) => {
    try {
      const { title } = req.query;
      const recipes = await getRecipes("all", title);
      res.json(recipes);
    } catch (error) {
      res.status(404).json({ error });
    }
  })
  .get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      if (id.length < 15) {
        const oneRecipe = await getOneApiRecipe(id);
        // const oneRecipe = await getOneFakeRecipe(id);
        res.json(oneRecipe);
      } else {
        const oneRecipe = await getOneDbRecipe(id);
        res.json(oneRecipe);
      }
    } catch (error) {
      res.status(404).json({ error });
    }
  });

module.exports = routerRecipe;
