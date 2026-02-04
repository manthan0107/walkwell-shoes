const express = require("express");
const { getAllContacts } = require("../../controllers/admin/contact-controller");

const router = express.Router();

router.get("/get", getAllContacts);

module.exports = router;
