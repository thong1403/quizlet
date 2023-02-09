const express = require("express");
const router = express.Router();
const studyController = require("../controllers/study.controller");
const authController = require("../controllers/users.controller");
const multer = require("multer");
const { requireAdmin } = require("../middlewares/middlewares");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/image");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix =
//       Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });
// const upload = multer({ storage });

router.get("/question/:id", studyController.renderQuestion);

router.post("/question/:id", studyController.createStudySets);

module.exports = router;
