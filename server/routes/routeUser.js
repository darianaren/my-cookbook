const { Router } = require("express"),
  {
    getAllUsers,
    getOneUser,
    getMyRecipes,
    getFavorites,
    postNewUser,
    updateUser,
    loginUser,
    logoutUser,
    modifyFavorites,
    deleteUser,
  } = require("../controllers/ctrlUser"),
  routerUser = Router();

routerUser
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
  .get("/:idUser/recipes", async (req, res) => {
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
  })
  .get("/:idUser/favorites", async (req, res) => {
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
  .post("/", async (req, res) => {
    try {
      const newUser = await postNewUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error });
    }
  })
  .put("/login", async (req, res) => {
    try {
      const { username, password } = req.body,
        login = await loginUser(username, password);
      res.json(login);
    } catch (error) {
      res.status(400).json({ error });
    }
  })
  .put("/logout/:idUser", async (req, res) => {
    try {
      const { idUser } = req.params,
        logout = await logoutUser(idUser);
      res.json(logout);
    } catch (error) {
      if (error === "User not found.") {
        res.status(404).json({ error });
      } else {
        res.status(400).json({ error });
      }
    }
  })
  .put("/update/:idUser", async (req, res) => {
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
  .put("/favorites/:idUser/:idRecipe", async (req, res) => {
    try {
      const { idUser, idRecipe } = req.params;
      const savedRecipe = await modifyFavorites(idUser, idRecipe);
      res.json(savedRecipe);
    } catch (error) {
      res.status(404).json({ error });
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
