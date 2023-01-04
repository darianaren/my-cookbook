require("dotenv").config();
const { Sequelize } = require("sequelize"),
  modelDiet = require("./modelDiet"),
  modelRecipe = require("./modelRecipe"),
  modelUser = require("./modelUser"),
  { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`,
  {
    logging: false,
    native: false,
  }
);

modelUser(sequelize);
modelDiet(sequelize);
modelRecipe(sequelize);

const { User, Recipe, Diet } = sequelize.models;

Recipe.belongsToMany(Diet, { through: "diets" });
Diet.belongsToMany(Recipe, { through: "diets" });

User.hasMany(Recipe, { as: "recipes", foreignKey: "recipes_id" });
Recipe.belongsTo(User, { as: "createdBy", foreignKey: "createdBy_id" });

module.exports = {
  sequelize,
  User,
  Recipe,
  Diet,
};
