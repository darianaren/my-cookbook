const { Router } = require("express"),
  routerFavorites = Router();

const {
  addFavorite,
  removeFavorite,
  getFavorites,
} = require("../../controllers/usersControllers/favorites");

routerFavorites
  .get("/:idUser", async (req, res) => {
    try {
      const { idUser } = req.params,
        savedRecipes = await getFavorites(idUser);
      res.json(savedRecipes);
    } catch (error) {
      if (error === "User not found.") {
        res.status(404).json({ error });
      } else {
        res.status(400).json({ error });
      }
    }
  })
  .put("/add/:idUser/:idRecipe", async (req, res) => {
    try {
      const { idUser, idRecipe } = req.params;
      const savedRecipe = await addFavorite(idUser, idRecipe);
      res.json(savedRecipe);
    } catch (error) {
      res.status(404).json({ error });
    }
  })
  .put("/remove/:idUser/:idRecipe", async (req, res) => {
    try {
      const { idUser, idRecipe } = req.params;
      const savedRecipe = await removeFavorite(idUser, idRecipe);
      res.json(savedRecipe);
    } catch (error) {
      res.status(404).json({ error });
    }
  });

module.exports = routerFavorites;
