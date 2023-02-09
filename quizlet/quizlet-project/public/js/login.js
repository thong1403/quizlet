let api = "http://127.0.0.1:3000/";
let form = document.getElementById("form");
let register = document.getElementById("register");

register.addEventListener("click", () => {
  window.location.href = "/register";
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let email1 = form.email.value;
  let password1 = form.password.value;
  if (!email1 || !password1) {
    swal({
      title: "Email or password is blank",
      text: "Please enter full information!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {});
  }

  fetch(api + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // credentials: 'include',
      // mode: 'cors'
    },
    body: JSON.stringify({
      email: email1,
      password: password1,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Hello world");
      if (data.status === "success") {
        console.log(data);
        window.location.href = "/";
      }
    })
    .catch((err) => console.log(err));
});
