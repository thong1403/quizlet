const front = document.getElementById("front0");
const back = document.getElementById("back0");
const btn = document.getElementById("flip-btn0");

function handleFlip() {
  front.classList.toggle("flipped");
  back.classList.toggle("flipped");
}

btn.addEventListener("click", handleFlip);

const front1 = document.getElementById("front1");
const back1 = document.getElementById("back1");
const btn1 = document.getElementById("flip-btn1");

function handleFlip1() {
  front1.classList.toggle("flipped");
  back1.classList.toggle("flipped");
}

btn1.addEventListener("click", handleFlip1);

const front2 = document.getElementById("front2");
const back2 = document.getElementById("back2");
const btn2 = document.getElementById("flip-btn2");

function handleFlip2() {
  front2.classList.toggle("flipped");
  back2.classList.toggle("flipped");
}

btn2.addEventListener("click", handleFlip2);

const front3 = document.getElementById("front3");
const back3 = document.getElementById("back3");
const btn3 = document.getElementById("flip-btn3");

function handleFlip3() {
  front3.classList.toggle("flipped");
  back3.classList.toggle("flipped");
}

btn3.addEventListener("click", handleFlip3);

const front4 = document.getElementById("front4");
const back4 = document.getElementById("back4");
const btn4 = document.getElementById("flip-btn4");

function handleFlip4() {
  front4.classList.toggle("flipped");
  back4.classList.toggle("flipped");
}

btn4.addEventListener("click", handleFlip4);
