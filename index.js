const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const identityRoute = require("./src/routes/identity");
const { connectDB } = require("./src/database/connection");

connectDB();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
  next();
});

try {
  app.use("/identity-reconciliation/v1", identityRoute);

  app.get("/", (req, res) => {
    res.status(200).send("Server is running");
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
} catch (error) {
  console.log(error);
  throw new Error(error);
}

// module.exports = app;
