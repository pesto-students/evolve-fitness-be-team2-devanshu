const express = require("express");
const router = express.Router();

const { createUser, getUserById } = require("../controllers/adminUser");
const { isAuthenticated } = require("../controllers/auth");

router.post("/admin/user", isAuthenticated, createUser);

router.get("/admin/user/:userId", isAuthenticated, getUserById);

module.exports = router;
