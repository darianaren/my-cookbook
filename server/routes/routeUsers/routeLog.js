const { Router } = require("express"),
  routerLog = Router();

const {
  loginUser,
  logoutUser,
} = require("../../controllers/usersControllers/log");

routerLog
  .put("/", async (req, res) => {
    try {
      const { username, password } = req.body,
        login = await loginUser(username, password);
      res.json(login);
    } catch (error) {
      res.status(400).json({ error });
    }
  })
  .put("/:idUser", async (req, res) => {
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
  });

module.exports = routerLog;
