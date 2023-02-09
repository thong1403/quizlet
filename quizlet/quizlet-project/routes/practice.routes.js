const express = require("express");
const {
  renderPractice,
  createQuestion,
} = require("../controllers/practice.controller");
const router = express.Router();

router.get("/:id", renderPractice);

router.post("/:id", createQuestion);

module.exports = router;
