const { Router } = require("express"),
  routerMyRecipes = Router();

const { getMyRecipes } = require("../../controllers/usersControllers/recipes");

routerMyRecipes.get("/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params,
      recipes = await getMyRecipes(idUser);
    res.json(recipes);
  } catch (error) {
    if (
      error === "User not found." ||
      error === "This user has not created any recipes."
    ) {
      res.status(404).json({ error });
    } else {
      res.status(400).json({ error });
    }
  }
});

module.exports = routerMyRecipes;
