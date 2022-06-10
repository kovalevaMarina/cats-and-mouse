var store = {
  down: false,
  timeoutIds: [],
  rectangleIntervalIds: [],
  timerIntervalsIds: [],
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

// получение координат кота и мыши
function catAndMouse(e) {
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
      compareCoordinatesCatAndMouse();
    }
  }, 2000);

  store.timeoutIds.push(timeId);

  if (mouseTouchRectangle()) {
    gameOver("Вы победили с результатом " + timerGame.innerHTML + "! &#9996;");
  }
}

// игра
mouse.addEventListener(
  "click",
  function () {
    store.down = true;
    var currentDate = new Date();
    var getTimerGameForCurrentDate = getTimerGameFunction(currentDate);

    store.rectangleIntervalIds.push(setInterval(getRectangleCoordinates, 5000));
    store.timerIntervalsIds.push(setInterval(getTimerGameForCurrentDate, 1000));

    body.addEventListener("mousemove", catAndMouse);
  },
  { once: true }
);

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
      parseInt(cat.style.top) + Math.round(cat.offsetHeight / 2) + "px"
  ) {
    gameOver(
      "Вы проиграли с результатом " + timerGame.innerHTML + "! &#128542;"
    );
  }
}

// создание таймера
function getTimerGameFunction(currentDate) {
  return function () {
    var date = new Date();
    var distance = new Date(date - currentDate);
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
  };
}

// окончание игры
function gameOver(textGameOver) {
  store.timeoutIds.forEach(clearTimeout);
  store.rectangleIntervalIds.forEach(clearInterval);
  store.timerIntervalsIds.forEach(clearInterval);
  container.hidden = true;
  resultGame.hidden = false;
  resultGame.innerHTML = textGameOver;
  body.removeEventListener("mousemove", catAndMouse);
}
