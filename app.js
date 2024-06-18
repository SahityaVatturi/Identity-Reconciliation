const express = require("express");
const cors = require("cors");
require("dotenv").config();
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const identityRoute = require("./src/routes/identity");

const app = express();


const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Enable credentials (cookies, HTTP authentication)
  optionsSuccessStatus: 204, // Respond with a 204 status for preflight requests
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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
    res.status(200).send('Server is running');
  });

  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(swaggerSpec);
  });

  app.use("/apiDocs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.listen(process.env.PORT, () => {
    console.log(`Server running of ${process.env.PORT}`);
  });
} catch (error) {
  console.log(error);
}

const onClose = () => {
  process.exit();
};

//Handle process server.
process.on("SIGTERM", onClose);
process.on("SIGINT", onClose);
process.on("uncaughtException", onClose);
