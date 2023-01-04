const { User, Recipe, Diet } = require("../models/database"),
  { compare, encrypt } = require("../helpers/helpBcrypt"),
  { getOneApiRecipe } = require("./ctrlRecipe");

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
async function getFavorites(idUser) {
  const userFound = await User.findByPk(idUser, {
    attributes: ["id", "favorites"],
  });
  if (!userFound) {
    throw "User not found.";
  }

  const allFavorites = [];

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
          await modifyFavorites(userFound.id, idRecipe);
        } else {
          allFavorites.push(recipeFound);
        }
      } else {
        const recipeFound = await getOneApiRecipe(idRecipe);
        if (!recipeFound) {
          await modifyFavorites(userFound.id, idRecipe);
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
async function postNewUser(object) {
  const { username, firstName, lastName, image, password } = object;
  if (!username || !firstName || !lastName || !password) {
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
  if (!username || !firstName || !lastName || !cookbook) {
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
async function loginUser(username, password) {
  if (!username || !password) {
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
async function modifyFavorites(idUser, idRecipe) {
  const userFound = await User.findByPk(idUser);
  if (!userFound) {
    throw "User not found.";
  }

  const recipeFav = userFound.favorites.find((id) => `${id}` === idRecipe);

  if (!recipeFav) {
    userFound.favorites = [idRecipe, ...userFound.favorites];
    await userFound.save();
    return { msg: "Successfully saved recipes." };
  }

  userFound.favorites = userFound.favorites.filter(
    (id) => `${id}` !== idRecipe
  );
  await userFound.save();
  return { msg: "Successfully removed recipes." };
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
  getMyRecipes,
  getFavorites,
  postNewUser,
  updateUser,
  loginUser,
  logoutUser,
  modifyFavorites,
  deleteUser,
};
