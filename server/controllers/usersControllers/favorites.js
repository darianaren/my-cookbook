const { User, Recipe, Diet } = require("../../models/database"),
  { getOneApiRecipe } = require("../recipesControllers/api");

async function getFavorites(idUser) {
  const allFavorites = [];

  const userFound = await User.findByPk(idUser, {
    attributes: ["id", "favorites"],
  });

  if (!userFound) {
    throw "User not found.";
  }

  async function getInfo(idRecipe) {
    try {
      if (idRecipe.length > 15) {
        const recipeFound = await Recipe.findByPk(idRecipe, {
          include: [
            {
              model: Diet,
              attributes: ["name"],
            },
          ],
        });

        if (!recipeFound) {
          await removeFavorite(userFound.id, idRecipe);
        } else {
          allFavorites.push(recipeFound);
        }
      } else {
        const recipeFound = await getOneApiRecipe(idRecipe);
        if (!recipeFound) {
          await removeFavorite(userFound.id, idRecipe);
        } else {
          allFavorites.push(recipeFound);
        }
      }
    } catch (error) {}
  }

  for (let idRecipe of userFound.favorites) {
    await getInfo(idRecipe);
  }

  return allFavorites;
}

async function addFavorite(idUser, idRecipe) {
  const userFound = await User.findByPk(idUser);

  if (!userFound) {
    throw "User not found.";
  }

  userFound.favorites = [idRecipe, ...userFound.favorites];

  await userFound.save();

  return { msg: "Successfully saved recipes." };
}

async function removeFavorite(idUser, idRecipe) {
  const userFound = await User.findByPk(idUser);

  if (!userFound) {
    throw "User not found.";
  }

  userFound.favorites = userFound.favorites.filter(
    (id) => `${id}` !== idRecipe
  );

  await userFound.save();

  return { msg: "Successfully removed recipes." };
}

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};
