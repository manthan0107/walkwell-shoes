const express = require("express");
const { addContact } = require("../../controllers/shop/contact-controller");

const router = express.Router();

router.post("/add", addContact);

module.exports = router;
