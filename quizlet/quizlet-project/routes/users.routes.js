const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const { requireAdmin } = require("../middlewares/middlewares");

// Get all

router.get("", requireAdmin, userController.getAll);

router.get("/profile/:id", userController.renderProfile);

router.put("/profile/:id", userController.updateProfile);

router.get("/solution", userController.renderSolution);
router.get("/expert", userController.renderExpert);
// Get one by Id
router.put("/:id", userController.updateUser);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.get("/:id", userController.getById);

module.exports = router;
