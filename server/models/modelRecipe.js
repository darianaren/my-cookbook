const { DataTypes } = require("sequelize");

const modelRecipe = (sequelize) => {
  sequelize.define(
    "Recipe",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter a title.",
          },
        },
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter a summary.",
          },
        },
      },
      healthScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter a health score.",
          },
          isInt: {
            args: true,
            msg: "Health score must be an integer between zero and a hundred.",
          },
          min: 0,
          max: 100,
        },
      },
      ingredients: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter ingredients.",
          },
        },
      },
      time: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter the preparation time.",
          },
          isInt: {
            args: true,
            msg: "Preparation time must be a integer greater than zero.",
          },
          min: 1,
        },
      },
      servings: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter the servings according to ingredients.",
          },
          isInt: {
            args: true,
            msg: "Servings must be a integer greater than zero.",
          },
          min: 1,
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
          "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
      },
      cuisines: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
      },
      dishTypes: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
      },
      occasions: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
      },
      instructions: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter instructions.",
          },
        },
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: true, updatedAt: false }
  );
};

module.exports = modelRecipe;
