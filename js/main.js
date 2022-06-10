var store = {
  down: false,
  timeoutIds: [],
};

var body = document.body;
var winWidth = window.innerWidth;
var winHeight = window.innerHeight;

var wrap = document.querySelector(".wrap");
var mouse = document.querySelector(".mouse");
var cat = document.querySelector(".cat");
var container = document.querySelector(".container");
var timerGame = document.querySelector(".timer");

var resultGame = document.querySelector(".result-game");
resultGame.hidden = true;

var rectangle = document.createElement("div");
rectangle.className = "rectangle";
container.append(rectangle);

// старт игры
var startGame = setTimeout(function () {
  container.hidden = true;
  resultGame.hidden = false;
}, 0);

body.addEventListener("click", function () {
  container.hidden = false;
  resultGame.hidden = true;
  clearTimeout(startGame);
});

// игра
mouse.addEventListener("click", function () {
  store.down = true;
  body.addEventListener("mousemove", function catAndMouse(e) {
    if (mouse) {
      mouse.style.left = e.clientX - mouse.offsetWidth / 2 + "px";
      mouse.style.top = e.clientY - mouse.offsetHeight / 2 + "px";
      mouse.style.position = "fixed";
      mouse.style.cursor = "none";
    }

    var timeId = setTimeout(function () {
      if (mouse) {
        cat.style.left = e.clientX - cat.offsetWidth / 2 + "px";
        cat.style.top = e.clientY - cat.offsetHeight / 2 + "px";
        cat.style.position = "fixed";
      }
    }, 2000);

    store.timeoutIds.push(timeId);

    if (mouseTouchRectangle()) {
      store.timeoutIds.forEach(clearTimeout);
      clearInterval(createRectangle);
      clearInterval(timer);
      container.hidden = true;
      resultGame.hidden = false;
      resultGame.innerHTML =
        "Игра закончилась &#9996; с результатом" +
        " " +
        timerGame.innerHTML +
        "!";
      body.removeEventListener("mousemove", catAndMouse);
    }
  });
});

// рандомное создание фигуры
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRectangleCoordinates() {
  var rectangleWidth = getRandomIntInclusive(50, 150) + "px";
  var rectangleHeight = getRandomIntInclusive(50, 150) + "px";
  var rectangleLeft =
    getRandomIntInclusive(0, winWidth - parseInt(rectangleWidth)) + "px";
  var rectangleTop =
    getRandomIntInclusive(0, winHeight - parseInt(rectangleHeight)) + "px";

  rectangle.style.width = rectangleWidth;
  rectangle.style.height = rectangleHeight;
  rectangle.style.left = rectangleLeft;
  rectangle.style.top = rectangleTop;
  rectangle.style.position = "fixed";
}

var createRectangle = setInterval(getRectangleCoordinates, 5000);

// координаты мыши и прямоугольника
function mouseTouchRectangle() {
  var leftMouse = parseInt(mouse.style.left) + mouse.offsetWidth / 2;
  var topMouse = parseInt(mouse.style.top) + mouse.offsetHeight / 2;
  if (
    leftMouse >= parseInt(rectangle.style.left) &&
    topMouse >= parseInt(rectangle.style.top) &&
    leftMouse <=
      parseInt(rectangle.style.width) + parseInt(rectangle.style.left) &&
    topMouse <= parseInt(rectangle.style.height) + parseInt(rectangle.style.top)
  )
    return true;
}

// сравнение координат мыши и кошки
function compareCoordinatesCatAndMouse() {
  if (
    parseInt(mouse.style.left) + mouse.offsetWidth / 2 + "px" ===
      parseInt(cat.style.left) + cat.offsetWidth / 2 + "px" &&
    parseInt(mouse.style.top) + mouse.offsetHeight / 2 + "px" ===
      parseInt(cat.style.top) + cat.offsetHeight / 2 + "px"
  ) {
    resultGame.innerHTML = "Игра закончена!";
  }
}

// создание таймера
var countDate = new Date();
function getTimerGame() {
  var date = new Date();
  var distance = new Date(date - countDate);
  var currentMinutes = distance.getMinutes();
  var currentSeconds = distance.getSeconds();

  if (currentMinutes < 10) {
    currentMinutes = "0" + currentMinutes;
  }

  if (currentSeconds < 10) {
    currentSeconds = "0" + currentSeconds;
  }
  var currentTotalTime = currentMinutes + ":" + currentSeconds;

  timerGame.innerHTML = currentTotalTime;
}

var timer = setInterval(getTimerGame, 1000);

// function gameOver() {
//   clearInterval(createRectangle);
//   resultGame.hidden = false;
//   resultGame.innerHTML = "Игра закончена!";
// }
