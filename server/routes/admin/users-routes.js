const express = require("express");
const { getAllUsers } = require("../../controllers/admin/users-controller");

const router = express.Router();

router.get("/get", getAllUsers);

module.exports = router;
