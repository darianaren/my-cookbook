const app = require("./app"),
  { sequelize } = require("./models/database");

app.listen(5000, () => {
  console.log("Server listening on port: http://localhost:5000");
  sequelize
    .sync({ alter: true })
    .then(() => {
      console.log("Database successfully synchronized.");
    })
    .catch((error) => console.log("Failed to synchronize database: ", error));
});
