const { Router } = require("express"),
  routerDiet = Router();

const {
  getDiets,
  getOneDiet,
} = require("../../controllers/dietsControllers/diets");

routerDiet
  .get("/", async (req, res) => {
    try {
      const allDiets = await getDiets();
      res.json(allDiets);
    } catch (error) {
      res.status(404).json({ error });
    }
  })
  .get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const oneDiet = await getOneDiet(id);
      res.json(oneDiet);
    } catch (error) {
      res.status(404).json(error);
    }
  });

module.exports = routerDiet;
