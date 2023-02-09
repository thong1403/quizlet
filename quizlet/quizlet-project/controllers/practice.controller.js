const db = require("../models/db");

module.exports.renderPractice = (req, res) => {
  let id = req.params.id;
  db.execute("SELECT * FROM questions WHERE set_id = ?", [id])
    .then((data) => {
      let [rows] = data;
      console.log(rows);
      res.render("practice", { data: rows });
    })
    .catch((err) => {
      res.status(500).json({
        status: "err",
        message: err,
      });
    });
};
module.exports.createQuestion = (req, res) => {
  let { term, definition, studySetId } = req.body;
  if (!term || !definition) {
    return res.status(500).json({
      message: "Invalid title or content",
    });
  }
  let id = Math.floor(Math.random() * 1000000);
  db.execute(`INSERT INTO questions VALUES(?, ?, ?, ?, ?)`, [
    id,
    term,
    definition,
    null,
    studySetId,
  ])
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
