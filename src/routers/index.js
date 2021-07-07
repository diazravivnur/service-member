const express = require("express");

const router = express.Router();

const { regitrasi, login } = require("../controllers/auth");
router.post("/register", regitrasi);
router.post("/login", login);

module.exports = router;
