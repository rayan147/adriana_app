const express = require("express");
const router = express.Router();

const { contact } = require("../contact");

router.post("/", contact);

module.exports = router;
