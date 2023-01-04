const { Router } = require("express"),
  routerDiet = require("./routeDiet"),
  routerUser = require("./routeUser"),
  routerRecipe = require("./routeRecipe"),
  routerRecipeDb = require("./routeRecipeDb"),
  routerRecipeApi = require("./routeRecipeApi"),
  router = Router();

router
  .get(`/`, (req, res) => {
    res.send(
      `Hello Word! Routes: 1) /users 2) /recipes 3) /recipesDb 4) /recipesApi 5) /diets`
    );
  })
  .use(`/users`, routerUser)
  .use(`/recipes`, routerRecipe)
  .use(`/recipesDb`, routerRecipeDb)
  .use(`/recipesApi`, routerRecipeApi)
  .use(`/diets`, routerDiet);

module.exports = router;
