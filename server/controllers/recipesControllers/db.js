require("dotenv").config();
const { User, Recipe, Diet } = require("../../models/database");

async function getDbRecipes() {
  const allDbRecipes = await Recipe.findAll({
    include: [
      {
        model: Diet,
        attributes: ["name"],
      },
      {
        model: User,
        as: "createdBy",
        attributes: ["id", "username"],
      },
    ],
    order: ["createdAt"],
  });
  return allDbRecipes.reverse();
}

async function getOneDbRecipe(id) {
  const oneDbRecipe = await Recipe.findByPk(id, {
    include: [
      {
        model: Diet,
        attributes: ["id", "name"],
      },
      {
        model: User,
        as: "createdBy",
        attributes: ["id", "username", "firstName", "lastName"],
      },
    ],
  });
  if (!oneDbRecipe) {
    throw "Recipe not found.";
  }
  return oneDbRecipe;
}

async function postDbRecipe(object) {
  const {
    idUser,
    title,
    summary,
    healthScore,
    ingredients,
    time,
    servings,
    image,
    cuisines,
    dishTypes,
    occasions,
    instructions,
    diets,
  } = object;

  if (
    !idUser ||
    !title ||
    !summary ||
    !healthScore ||
    !ingredients ||
    !time ||
    !servings ||
    !instructions
  ) {
    throw "Data are incomplete.";
  }

  const userFound = await User.findByPk(idUser);

  if (!userFound) {
    throw "User not found.";
  }

  const newRecipe = await Recipe.create({
    title,
    summary,
    healthScore,
    ingredients,
    time,
    servings,
    image,
    cuisines,
    dishTypes,
    occasions,
    instructions,
    createdBy_id: idUser,
  });

  if (diets.length > 0) {
    for (let dietName of diets) {
      const [dietFound, created] = await Diet.findOrCreate({
        where: { name: dietName },
      });
      await dietFound.addRecipe(newRecipe);
      await newRecipe.addDiet(dietFound);
    }
  }
  await userFound.addRecipe(newRecipe);
  await userFound.save();

  return newRecipe;
}

async function updateDbRecipe(id, object) {
  const recipeFound = await Recipe.findByPk(id, {
    include: [
      {
        model: Diet,
        attributes: ["id", "name"],
      },
    ],
  });

  if (!recipeFound) {
    throw "Recipe not found.";
  }

  if (recipeFound.Diets && recipeFound.Diets.length > 0) {
    for (let diet of recipeFound.Diets) {
      const [dietFound, created] = await Diet.findOrCreate({
        where: { name: diet.name },
      });
      await dietFound.removeRecipe(recipeFound);
      await recipeFound.removeDiet(dietFound);
      await dietFound.save();
    }
    await recipeFound.save();
  }

  const {
    title,
    summary,
    healthScore,
    ingredients,
    time,
    servings,
    image,
    cuisines,
    dishTypes,
    occasions,
    instructions,
    diets,
  } = object;

  if (
    !title ||
    !summary ||
    !healthScore ||
    !ingredients ||
    !time ||
    !servings ||
    !image ||
    !cuisines ||
    !dishTypes ||
    !occasions ||
    !instructions ||
    !diets
  ) {
    throw "Data are incomplete.";
  }

  recipeFound.title = title;
  recipeFound.summary = summary;
  recipeFound.healthScore = healthScore;
  recipeFound.ingredients = ingredients;
  recipeFound.time = time;
  recipeFound.servings = servings;
  recipeFound.image = image;
  recipeFound.cuisines = cuisines;
  recipeFound.dishTypes = dishTypes;
  recipeFound.occasions = occasions;
  recipeFound.instructions = instructions;

  if (diets.length > 0) {
    for (let dietName of diets) {
      const [dietFound, created] = await Diet.findOrCreate({
        where: { name: dietName },
      });
      await dietFound.addRecipe(recipeFound);
      await recipeFound.addDiet(dietFound);
    }
  }

  await recipeFound.save();
  return recipeFound;
}

async function deleteDbRecipe(id) {
  try {
    await Recipe.destroy({ where: { id } });
    return { msg: "Recipe was successfully deleted." };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getDbRecipes,
  getOneDbRecipe,
  postDbRecipe,
  updateDbRecipe,
  deleteDbRecipe,
};
