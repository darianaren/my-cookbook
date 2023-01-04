const { DataTypes } = require("sequelize");

const modelDiet = (sequelize) => {
  sequelize.define(
    "Diet",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};

module.exports = modelDiet;
