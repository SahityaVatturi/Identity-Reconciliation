const express = require("express");
const { health } = require("../controllers/identityController");
const router = express.Router();

// router.post("/identify", createOrUpdateIdentity);
router.get("/health", health);


module.exports = router;
