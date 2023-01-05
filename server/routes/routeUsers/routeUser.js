const { Router } = require("express"),
  routerUser = Router();

const {
  getAllUsers,
  getOneUser,
  postNewUser,
  updateUser,
  deleteUser,
} = require("../../controllers/usersControllers/users");
const routerFavorites = require("./routeFavorites");
const routerLog = require("./routeLog");
const routerMyRecipes = require("./routeMyRecipes");

routerUser
  .use("/favorites", routerFavorites)
  .use("/log", routerLog)
  .use("/my-recipes", routerMyRecipes)

  .get("/", async (req, res) => {
    try {
      const allUsers = await getAllUsers();
      res.json(allUsers);
    } catch (error) {
      if (error === "Users not found.") {
        res.status(404).json({ error });
      } else {
        res.status(400).json({ error });
      }
    }
  })
  .get("/:idUser", async (req, res) => {
    try {
      const { idUser } = req.params,
        oneUser = await getOneUser(idUser);
      res.json(oneUser);
    } catch (error) {
      if (error === "User not found.") {
        res.status(404).json({ error });
      } else {
        res.status(400).json({ error });
      }
    }
  })
  .post("/", async (req, res) => {
    try {
      const newUser = await postNewUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error });
    }
  })
  .put("/:idUser", async (req, res) => {
    try {
      const { idUser } = req.params,
        updatedUser = await updateUser(idUser, req.body);
      res.json(updatedUser);
    } catch (error) {
      if (error === "User not found.") {
        res.status(404).json({ error });
      } else {
        res.status(400).json({ error });
      }
    }
  })
  .delete("/:idUser", async (req, res) => {
    try {
      const { idUser } = req.params,
        deletedUser = await deleteUser(idUser);
      res.json(deletedUser);
    } catch (error) {
      res.status(404).json({ error });
    }
  });

module.exports = routerUser;
