const db = require("../models/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
let strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
module.exports.renderSolution = (req, res) => {
  res.render("solution");
};
module.exports.renderExpert = (req, res) => {
  res.render("expert");
};
module.exports.renderProfile = (req, res) => {
  let id = req.params.id;
  db.execute("SELECT * FROM users WHERE id = ?", [id])
    .then((data) => {
      let [rows] = data;
      let dataId = rows[0];
      db.execute("SELECT * FROM study_sets WHERE user_id = ?", [id]).then(
        (dataUser) => {
          let [bac] = dataUser;
          console.log(bac);
          res.render("profile", { data: dataId, questions: bac });
        }
      );
    })
    .catch((err) => console.log(err));
};

module.exports.getAll = (req, res) => {
  // phân trang
  let { page_size, page_index } = req.query;
  console.log(req.query);
  page_index = Number(page_index) || 1;
  page_size = Number(page_size) || 5;

  let total = 0;
  db.execute(`SELECT * FROM users`)
    .then((data) => {
      let [rows, cols] = data;
      console.log(rows);
      // array destructuring
      // let rows = data[0];
      // let cols = data[1];
      total = rows.length;
      return db.execute(
        `SELECT * FROM users LIMIT ${page_size} OFFSET ${
          (page_index - 1) * page_size
        }`
      );
      // res.render("users", {
      //   data: rows,
      // });
    })
    .then((data) => {
      let [rows, cols] = data;
      console.log(total);
      res.render("adminview", {
        data: rows,
        total,
        page_size,
        page_index,
      });
    })
    .catch((err) => console.log(err));
};
module.exports.getById = (req, res) => {
  let id = req.params.id;
  db.execute("SELECT * FROM users WHERE id = ?", [id])
    .then((data) => {
      let [rows] = data;

      console.log(rows[0]);
      res.status(200).json({
        data: rows[0],
      });
    })
    .catch((err) => console.log(err));
};

module.exports.createUser = (req, res) => {
  let { email, password, username } = req.body;
  if (!email || !password) {
    return res.status(500).json({
      message: "Invalid email or password",
    });
  }

  if (!strongRegex.test(password)) {
    return res.status(500).json({
      message: "Password is not strong enough",
    });
  }

  // generate password and id
  password = bcrypt.hashSync(password, saltRounds);
  let id = Math.floor(Math.random() * 1000000);

  // execute SQL query
  db.execute("SELECT * FROM users WHERE email = ?", [email])
    .then((data) => {
      let [rows] = data;
      // 1 mảng chứa 1 phần tử nếu tìm thấy user
      // [] nếu không tìm thấy
      if (rows.length > 0) {
        return Promise.reject("User already exist");
      } else {
        return db.execute("INSERT INTO users VALUES(?, ?, ?, ?, ?, ?, ?,?)", [
          id,
          null,
          email,
          password,
          null,
          "user",
          username,
          null,
        ]);
      }
    })
    .then((data) => {
      return res.status(200).json({
        message: "create one successfully",
      });
      // redirect (/login) thay vì trả về json message
    })
    .catch((err) => {
      return res.status(500).json({
        err: err,
      });
    });
};
module.exports.updateProfile = (req, res) => {
  let { id } = req.params;
  console.log(id);
  let { fullname, email, urlImage, userName, birth } = req.body;
  console.log(req.body);
  db.execute(
    "UPDATE users SET fullname = ?,email = ?, image = ?, username = ?, dateofbirth = ? WHERE id = ?",
    [fullname, email, urlImage, userName, birth, id]
  )
    .then((data) => {
      console.log(data);
      res.status(200).json({
        message: "update one successfully",
      });
    })
    .catch((err) => console.log(err));
};

module.exports.updateUser = (req, res) => {
  let { id } = req.params;

  let { fullname, username, dateofbirth, image } = req.body;
  console.log(req.body);
  db.execute(
    "UPDATE users SET fullname = ?, username = ?, dateofbirth = ?, image = ? WHERE id = ?",
    [fullname, username, dateofbirth, image, id]
  )
    .then((data) => {
      console.log(data);
      res.status(200).json({
        message: "update one successfully",
      });
    })
    .catch((err) => console.log(err));
};

module.exports.deleteUser = (req, res) => {
  let { id } = req.params;
  db.execute("DELETE FROM users WHERE id = ?", [id])
    .then((data) => {
      console.log(data);
      res.status(200).json({
        message: "delete one successfully",
      });
    })
    .catch((err) => console.log(err));
};
