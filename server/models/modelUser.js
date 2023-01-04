const { DataTypes } = require("sequelize");

const modelUser = (sequelize) => {
  sequelize.define(
    "User",
    {
      image: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            args: true,
            msg: "Image must be a integer between zero and five.",
          },
          min: -1,
          max: 5,
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isLowercase: {
            args: true,
            msg: "The username cannot contain capital letters.",
          },
          notNull: {
            msg: "Please enter your username.",
          },
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: "The first name can only contain letters.",
          },
          notNull: {
            msg: "Please enter your first name.",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: "The last name can only contain letters.",
          },
          notNull: {
            msg: "Please enter your last name.",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please enter your password." },
        },
      },
      cookbook: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "My cookbook",
      },
      favorites: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false,
      },
      login: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    { timestamps: false }
  );
};

module.exports = modelUser;
