const db = require("../models/db");
const _ = require("lodash");

module.exports.renderRegister = (req, res) => {
  res.render("register");
};
module.exports.renderQuestion = (req, res) => {
  let { id } = req.params.id;
  let { set_id } = req.query;
  if (!set_id) {
    res.render("question", {
      dataSet: "",
      questionRenderData: "",
    });
  } else {
    db.execute("SELECT * FROM study_sets WHERE set_id = ?", [set_id])
      .then((data) => {
        let [rows] = data;
        let data_set_id = rows[0];
        console.log(data_set_id);
        db.execute("SELECT * FROM questions WHERE set_id = ?", [set_id]).then(
          (dataset) => {
            let [rows_set] = dataset;
            let questionRender = rows_set;
            res.render("question", {
              dataSet: data_set_id,
              questionRenderData: questionRender,
            });
          }
        );
      })
      .catch((err) => {
        res.status(500).json({
          status: "err",
          message: err,
        });
      });
  }
};
module.exports.createStudySets = (req, res) => {
  let { title, description, studySetId } = req.body;
  let userId = req.params.id;
  console.log(userId);
  if (!title || !description) {
    return res.status(500).json({
      message: "Invalid title or content",
    });
  }
  // let id = Math.floor(Math.random() * 1000000);
  db.execute(`INSERT INTO study_sets VALUES(?, ?, ?, ?, ?)`, [
    studySetId,
    title,
    description,
    null,
    userId,
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
