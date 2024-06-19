const app = require("../../index.js");
require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

module.exports = app;
