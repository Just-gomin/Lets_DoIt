const greetingForm = document.querySelector(".js-greetingForm"),
  greetingInput = document.querySelector(".js-greetingInput"),
  greetingMSG = document.querySelector(".js-greetingMSG");

const USER_NAME = "userName";

const ShowingON = "showing-on";
const ShowingOFF = "showing-off";

const MENTS = [
  "아, 너가 있어 아름다운 오늘이야 :)",
  "아, 오늘의 너가 어땠든, 너의 가능성은 사라지지 않아.",
  "아, 너는 자세히 볼수록 아름다워, 오래보자 우리:)",
  "아, 감정에 솔직해져 보자. 울고 싶음 울어도 돼",
  "아, 너는 오늘도 역시 아름답구나 :)",
  "아, 나 오늘 정말 힘들었다? 그래도 너가 있어서 다행이야",
  "아, 넌 역시 오늘도 멋졌어 :)",
  "아, 웃는 얼굴을 보니 나도 기분이 좋네 :)",
];

function paintGreeting(name = "") {
  greetingForm.classList.remove(ShowingON);
  greetingForm.classList.add(ShowingOFF);
  greetingMSG.classList.remove(ShowingOFF);
  greetingMSG.classList.add(ShowingON);
  let message = name + MENTS[parseInt(Math.random() * MENTS.length)];
  greetingMSG.innerHTML = message;
}

function saveName(name = "") {
  localStorage.setItem(USER_NAME, name);
}

function handleNameSubmit(event) {
  event.preventDefault();
  const inputVal = greetingInput.value;
  paintGreeting(inputVal);
  saveName(inputVal);
}

function askName() {
  greetingForm.classList.remove(ShowingOFF);
  greetingForm.classList.add(ShowingON);
  greetingForm.addEventListener("submit", handleNameSubmit);
  greetingMSG.classList.remove(ShowingON);
  greetingMSG.classList.add(ShowingOFF);
}

function loadName() {
  const userName = localStorage.getItem(USER_NAME);
  if (userName !== null) {
    paintGreeting(userName);
  } else {
    askName();
  }
}

function inputFocus(event) {
  greetingInput.placeholder = "";
}

function inputFocusout(event) {
  greetingInput.placeholder = "이름을 알려주세요!성은 빼주시겠어요?:)";
}

function init() {
  loadName();
  greetingInput.addEventListener("click", inputFocus);
  greetingInput.addEventListener("blur", inputFocusout);
}

init();
