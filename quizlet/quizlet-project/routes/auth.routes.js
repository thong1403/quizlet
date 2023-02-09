const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/users.controller");
const {
  requireAdmin,
  notRequireAuth,
  requireAuth,
} = require("../middlewares/middlewares");

router.get("/register", authController.renderRegister);

router.post("/register", userController.createUser);

router.get("/login", authController.renderLogin);

router.post("/login", authController.login);

router.get("/users", userController.getAll);

router.get("/", requireAdmin, authController.renderHomePage);

module.exports = router;
