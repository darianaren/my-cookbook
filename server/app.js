const express = require("express"),
  cors = require("cors"),
  router = require("./routes/index"),
  app = express();

app.use(cors());
app.use(express.json());

app.use("/", router);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;
