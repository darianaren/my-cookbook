const { User, Recipe, Diet } = require("../../models/database");

async function getMyRecipes(idUser) {
  const userFound = await User.findByPk(idUser, {
    include: [
      {
        model: Recipe,
        as: "recipes",
      },
    ],
  });
  if (!userFound) {
    throw "User not found.";
  }
  const recipes = await userFound.getRecipes({
    include: [
      {
        model: Diet,
        attributes: ["name"],
      },
    ],
    order: ["createdAt"],
  });
  return recipes.reverse();
}

module.exports = {
  getMyRecipes,
};
