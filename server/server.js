require("dotenv").config();
const app = require("./app"),
  { sequelize } = require("./models/database"),
  { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
  sequelize
    .sync({ alter: true })
    .then(() => {
      console.log("Database successfully synchronized.");
    })
    .catch((error) => console.log("Failed to synchronize database: ", error));
});
