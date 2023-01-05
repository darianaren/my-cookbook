const { User } = require("../../models/database"),
  { compare } = require("../../helpers/helpBcrypt");

async function loginUser(username, password) {
  if (
    !username ||
    !password ||
    username.length === 0 ||
    password.length === 0
  ) {
    throw "Data are incomplete.";
  }

  const userFound = await User.findOne({ where: { username } });

  if (!userFound) {
    throw "Incorrect username.";
  }

  const checkPassword = await compare(password, userFound.password);

  if (!checkPassword) {
    throw "Incorrect password.";
  }

  await userFound.update({ login: true });
  await userFound.save();

  return userFound;
}

async function logoutUser(idUser) {
  const userFound = await User.findByPk(idUser);

  if (!userFound) {
    throw "User not found.";
  }
  if (!userFound.login) {
    throw "The session is close.";
  }

  await userFound.update({ login: false });
  await userFound.save();

  return { msg: "The session was successfully closed." };
}

module.exports = {
  loginUser,
  logoutUser,
};
