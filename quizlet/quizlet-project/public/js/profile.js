const studySetList = document.getElementById("bsaa");
const close = document.getElementById("close");

studySetList.addEventListener("click", (e) => {
  e.preventDefault();
  let studySet = e.target.id;
  console.log(e.target);
  let studySetArr = studySet.split("-");
  let setId = studySetArr[2];
  if (setId) {
    window.location.href = `http://127.0.0.1:3000/study/practice/${setId}`;
  }
});
const api = window.location.href;
let id = api.split("/")[5];
const formUpdate = document.getElementsByClassName("lol");
const btnUpdate = document.getElementById("btn-update");
btnUpdate.addEventListener("click", (e) => {
  e.preventDefault();
  let fullname = formUpdate[0].value;
  let email = formUpdate[1].value;
  let urlImage = formUpdate[2].value;
  let userName = formUpdate[3].value;
  let birth = formUpdate[4].value;
  let data = {
    fullname: fullname,
    email: email,
    urlImage: urlImage,
    userName: userName,
    birth: birth,
  };
  fetch(`http://127.0.0.1:3000/users/profile/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      swal("Good job!", "Update success fully!", "success");
    })
    .catch((err) => {
      console.log(err);
    });
});

close.addEventListener("click", () => {
  window.location.href = api;
});
