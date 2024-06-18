const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
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

  const swaggerDefinition = {
    info: {
      title: "Identity Reconciliation",
      version: "1.0.0",
      description: "Identity Reconciliation",
    },
    host: `localhost:${process.env.PORT}`,
    basePath: "/identity-reconciliation/v1",
  };

  const options = {
    swaggerDefinition: swaggerDefinition,
    apis: ["./Controllers/**/*.js", "./api.yaml"],
  };

  const swaggerSpec = swaggerJSDoc(options);

  app.get("/", (req, res) => {
    res.status(200).send("Server is running");
  });

  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(swaggerSpec);
  });

  app.use("/apiDocs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
} catch (error) {
  console.log(error);
  throw new Error(error);
}

const onClose = () => {
  process.exit();
};

//Handle process server.
process.on("SIGTERM", onClose);
process.on("SIGINT", onClose);
process.on("uncaughtException", onClose);
