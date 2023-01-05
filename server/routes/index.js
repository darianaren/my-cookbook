const routerDiet = require("./routeDiets/routeDiet");
const routerRecipe = require("./routeRecipes/routeRecipe");
const routerRecipeApi = require("./routeRecipes/routeRecipeApi");
const routerRecipeDb = require("./routeRecipes/routeRecipeDb");
const routerUser = require("./routeUsers/routeUser");

const { Router } = require("express"),
  router = Router();

router
  .get(`/`, (req, res) => {
    res.send(
      `Hello Word! Routes: 1) /users 2) /recipes 3) /recipes-db 4) /recipes-api 5) /diets`
    );
  })
  .use(`/users`, routerUser)
  .use(`/recipes`, routerRecipe)
  .use(`/recipes-db`, routerRecipeDb)
  .use(`/recipes-api`, routerRecipeApi)
  .use(`/diets`, routerDiet);

module.exports = router;
