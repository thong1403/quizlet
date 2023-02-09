let login = document.getElementById("loginPage");
let register = document.getElementById("registerPage");
let loginFree = document.getElementById("register-free");
let start = document.getElementById("start")

login.addEventListener("click", () => {
   window.location.href = "/login"
})
register.addEventListener("click", () => {
    window.location.href = "/register"
 })
 loginFree.addEventListener("click", () => {
   window.location.href ="/register"
 })
start.addEventListener("click", () => {
   window.location.href = "/login"
})

