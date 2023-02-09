$(function () {
  $("#upload_link").on("click", function (e) {
    e.preventDefault();
    $("#upload:hidden").trigger("click");
  });
});

$(function () {
  $("#upload-image").on("click", function (e) {
    e.preventDefault();
    $("#upload-img:hidden").trigger("click");
  });
});
// let apiId = window.location.href;
// let id = apiId.split("/")[5];
// function Redirect() {
//   window.location = `http://127.0.0.1:3000/study/practice/${id}`;
// }

let api = "http://127.0.0.1:3000/";
let formStudySet = document.getElementById("form-study-set");
let formQuestion = document.getElementById("form-questions1");
let btnAddQuestion = document.getElementById("button-add");
let btnAddStudySet = document.getElementById("create-study-set");

window.onload = function () {
  let params = new URL(document.location).searchParams;
  let set_id = params.get("set_id");
  if (set_id) {
    btnAddStudySet.disabled = true;
    btnAddStudySet.innerText = "Set created";
  }
};

// formQuestion.addEventListener("submit", (e) => {
//   e.preventDefault();
//   let apiId = window.location.href;
//   let id = apiId.split("/")[5];
//   let term1 = formQuestion.term1.value;
//   let defintion1 = formQuestion.defintion1.value;
//   let data = {
//     term1,
//     defintion1,
//     studySetId,
//   };
//   fetch(api + `study/practice/${studySetId}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

let divBigQuestion = document.getElementById("question-big");
let numberQuestion = document.getElementsByClassName("number-list");

// let index = Number(numberQuestion[numberQuestion.length - 1].innerText);
let index = 0;
btnAddQuestion.addEventListener("click", (e) => {
  e.preventDefault();
  index = index + 1;
  let addDiv = document.createElement("div");
  addDiv.innerHTML = `<div id="question-child${index}">
  <form action="" id="form-questions-${index}" class="form-questions">
      <div class="question-item">
        <div class="number-list">
          ${index}
        </div>
        <div class="question">
          <div class="question-child1">         
            <textarea maxlength="255" name="term1" placeholder="Enter term" tabindex="5" variant="default" class="AutoExpandTextarea-textarea-question"></textarea>
            <span class="UITextarea-border-question"></span>
            <h5>
              TERM
            </h5>
          </div>
          <div class="question-child2">
              <textarea maxlength="255" name="defintion1" placeholder="Enter definition" tabindex="5" variant="default" class="AutoExpandTextarea-textarea-question"></textarea>
            <span class="UITextarea-border-question"></span>
            <h5>
              DEFINITION
            </h5>
          </div>
          <div class="input-img">
              <button class="btn-submit" id="btn-submit">
                Submit
              </button>
          </div>
        </div>
      </div>
  </form>
</div>
`;
  divBigQuestion.appendChild(addDiv);
});

divBigQuestion.addEventListener("click", (e) => {
  e.preventDefault();
  let btnSubmit =
    e.target.parentElement.parentElement.parentElement.parentElement.id;
  id = btnSubmit.split("-")[2];
  formQuestion =
    e.target.parentElement.parentElement.parentElement.parentElement
      .parentElement.children[0];
  let term = formQuestion.term1.value;
  let definition = formQuestion.defintion1.value;
  let api1 = window.location.href;
  let studySetId = api1.split("=")[1];
  let data = { term, definition, studySetId };

  fetch(api + `study/practice/${studySetId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

let studySetId = Math.floor(Math.random() * 100000);
formStudySet.addEventListener("submit", (e) => {
  e.preventDefault();

  let apiId = window.location.href;
  let id = apiId.split("/")[5];
  let title = formStudySet.title.value;
  let description = formStudySet.description.value;
  let data = { title, description, studySetId };
  fetch(api + `study/question/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      window.location.href = `/study/question/${id}?set_id=${studySetId}`;
    })
    .catch((err) => {
      console.log(err);
    });
});
