require("dotenv").config();
const { Recipe, Diet } = require("../../models/database"),
  { dietsApiCache } = require("../../helpers/helpApi"),
  { API_KEY } = process.env,
  urlApi = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`,
  urlFake = `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`;

module.exports = {
  getDiets: async function () {
    const arraysDiets = await dietsApiCache(urlApi);
    const dietsRepeat = arraysDiets.flat();
    const diets = [...new Set(dietsRepeat)];
    diets.forEach((diet) => {
      Diet.findOrCreate({
        where: { name: diet },
      });
    });
    const allDiets = await Diet.findAll({
      include: [
        {
          model: Recipe,
          attributes: ["id", "title"],
        },
      ],
    });
    return allDiets;
  },
  getOneDiet: async function (id) {
    const oneDiet = await Diet.findByPk(id, {
      include: [
        {
          model: Recipe,
        },
      ],
    });
    if (!oneDiet) {
      throw "Diet not found.";
    }
    return oneDiet;
  },
};
