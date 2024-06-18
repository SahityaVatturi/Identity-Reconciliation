const express = require("express");
const { createOrUpdateIdentity } = require("../controllers/identityController");
const router = express.Router();

router.post("/identify", createOrUpdateIdentity);

module.exports = router;
