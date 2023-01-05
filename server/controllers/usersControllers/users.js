const { User, Recipe } = require("../../models/database"),
  { encrypt } = require("../../helpers/helpBcrypt");

async function getAllUsers() {
  const allUsers = await User.findAll({
    include: [
      {
        model: Recipe,
        as: "recipes",
        attributes: ["id", "title"],
      },
    ],
  });
  if (allUsers.length === 0) {
    throw "Users not found.";
  }
  return allUsers;
}

async function getOneUser(idUser) {
  const userFound = await User.findByPk(idUser, {
    attributes: [
      "id",
      "username",
      "firstName",
      "lastName",
      "image",
      "cookbook",
      "login",
    ],
  });
  if (!userFound) {
    throw "User not found.";
  }
  return userFound;
}

async function postNewUser(object) {
  const { username, firstName, lastName, image, password } = object;

  if (image < 0 || image > 5) {
    throw "The image is incorrect.";
  }

  if (
    !username ||
    !firstName ||
    !lastName ||
    !password ||
    username.length === 0 ||
    firstName.length === 0 ||
    lastName.length === 0 ||
    password.length === 0
  ) {
    throw "Data are incomplete.";
  }

  const passwordHash = await encrypt(password);

  const [user, userCreated] = await User.findOrCreate({
    where: { username },
    defaults: {
      image,
      firstName,
      lastName,
      password: passwordHash,
      cookbook: `${firstName}'s cookbook`,
      favorites: [],
      login: false,
    },
  });

  if (!userCreated) {
    throw "Username is not available.";
  }

  return { user };
}

async function updateUser(idUser, object) {
  const { username, firstName, lastName, image, newPassword, cookbook } =
    object;

  if (image < 0 || image > 5) {
    throw "The image is incorrect.";
  }

  if (
    !username ||
    !firstName ||
    !lastName ||
    !cookbook ||
    username.length === 0 ||
    firstName.length === 0 ||
    lastName.length === 0 ||
    cookbook.length === 0
  ) {
    throw "Data are incomplete.";
  }

  const userFound = await User.findByPk(idUser);

  if (!userFound) {
    throw "User not found.";
  }

  if (username !== userFound.username) {
    const newUsername = await User.findOne({ where: { username } });
    if (newUsername) {
      throw "Username is not available.";
    }
    userFound.username = username;
  }

  if (newPassword) {
    const passwordHash = await encrypt(newPassword);
    userFound.password = passwordHash;
  }

  userFound.cookbook = cookbook;
  userFound.firstName = firstName;
  userFound.lastName = lastName;
  userFound.image = image;

  await userFound.save();

  return userFound;
}

async function deleteUser(idUser) {
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

  const recipes = await userFound.getRecipes();

  if (recipes.length > 0) {
    for (i in recipes) {
      const idRecipe = recipes[i].id;
      await Recipe.destroy({ where: { id: idRecipe } });
    }
  }

  await userFound.destroy();

  return { msg: "User was successfully deleted." };
}

module.exports = {
  getAllUsers,
  getOneUser,
  postNewUser,
  updateUser,
  deleteUser,
};
