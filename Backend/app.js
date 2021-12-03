const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const morgan = require("morgan");

require("dotenv").config();
require("./helpers/init_mongodb");
const AuthRoute = require("./src/routes/auth.route");
const PORT = process.env.PORT || 3030;
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/auth", AuthRoute);

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: err.status || 500,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
