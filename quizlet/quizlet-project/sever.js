const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cors = require("cors");
const morgan = require("morgan");
port = 3000;
const {
  requireAuth,
  notRequireAuth,
  requireAdmin,
} = require("./middlewares/middlewares");
const cookieParser = require("cookie-parser");
const db = require("./models/db");

// import route
const userRoutes = require("./routes/users.routes");
let studyRoutes = require("./routes/study.routes");
// const clearRoutes = require("./routes/clear.routes");
let authRoutes = require("./routes/auth.routes");
let practiceRouter = require("./routes/practice.routes");
// let blogRoutes = require("./routes/clear.routes");

// view engine
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

// third party
app.use(bodyParser.urlencoded({ extended: true })); // form-input (method=post)
app.use(bodyParser.json()); // json (fetch api)
app.use(cors()); // fix cross origin error
app.use(morgan("dev")); // log request on server (for debugging)
app.use(express.static("public")); // hosting static file
app.use(cookieParser("secret"));

// app.get("/question", (req, res) => {
//   res.render("question");
// });
app.use("", authRoutes);

app.use("/users", userRoutes);

app.use("/study", studyRoutes);

app.use("/study/practice", practiceRouter);

// app.use("/auth", notRequireAuth, authRoutes);

// app.get("/", (req, res) => {
//   res.render("adminview");
// });
// app.use("", userRoutes);

// setup route
// app.get("/", requireAuth, (req, res) => {
//   res.redirect("/users")
// });
// app.get("/", requireAuth, (req, res) => {
//   res.render("homePage");
// });

// app.get("/auth/register", (req,res) => {
//   res.render("register")
// })
// app.get("/login", (req,res) => {
//   res.render("login")
// })

// User route
// app.use("homePage", requireAuth, userRoutes);

// Auth route

app.listen(port, () => {
  console.log("Server is running on port http://127.0.0.1:3000");
});
