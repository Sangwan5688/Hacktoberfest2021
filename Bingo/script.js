// Jó munkát!
const generateButton = document.querySelector("button#generate");
const controls = document.querySelectorAll("#controls");
const draw = document.querySelector("#draw");
let numArray = [];
const span = document.querySelector("span#numberlist");
let tdValues = [];

const winnerTD = [
  //sorok
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  //oszlopok
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  // átlók
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];

function generatebuttonHandler() {
  generateButton.style.display = "none";

  let table = document.createElement("table");
  let thead = document.createElement("tr");

  "BINGO".split("").forEach((letter) => {
    let th = document.createElement("th");
    th.textContent = letter;
    thead.appendChild(th);
  });
  table.appendChild(thead);

  for (let i = 0; i < 5; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < 5; j++) {
      let td = document.createElement("td");
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  document.body.appendChild(table);
  table.style.border = "1px solid black";
  table.style.border = "none";
  let items = document.querySelectorAll("td");
  let container = [];
  items.forEach((item) => {
    let randomNum =  Math.floor(Math.random() * 100);

    while(container.includes(randomNum)){
      randomNum =  Math.floor(Math.random() * 100);
    }
    item.innerHTML = randomNum;
    container.push(randomNum);
  });
  items[12].innerHTML = "FREE";

  controls.forEach((itemContrl) => {
    if (itemContrl.classList == "hidden") {
      itemContrl.classList.remove("hidden");
    }
  });
}
generateButton.addEventListener("click", generatebuttonHandler);

function handleClickIn(event) {
  if (event.target.classList.contains("selected")) {
    event.target.classList.remove("selected");
  } else {
    event.target.classList.add("selected");
  }
}
delegate(document.body, "click", "td", handleClickIn);

function handleDraw() {
  let spanOutNum = Math.floor(Math.random() * 100);
  if (numArray.includes(spanOutNum)) {
    return;
  } else {
    numArray.push(spanOutNum);
    span.innerHTML = numArray.join(";");
  }
  tdValues = document.querySelectorAll("td");
  tdValues.forEach((td) => {
    if (td.innerHTML == spanOutNum) {
      td.classList.add("selected");
    }
  });

  handleWinner();
}
draw.addEventListener("click", handleDraw);

function handleWinner() {
  let td = document.querySelectorAll("td");
  winnerTD.forEach((item) => {
    let isWinner = true;
    let hasJoker = false;
    item.forEach((index) => {
      if (index === 12) {
        if (!td[index].classList.contains("selected")) {
          hasJoker = true;
        }
      } else {
        if (!td[index].classList.contains("selected")) {
          isWinner = false;
        }
      }
    });
    if (isWinner || (hasJoker && isWinnerWithoutJoker(item, td))) {
      alert("You win");
    }
  });
}

function isWinnerWithoutJoker(item, td) {
  let isWinner = true;
  item.forEach((index) => {
    if (index !== 12 && !td[index].classList.contains("selected")) {
      isWinner = false;
    }
  });
  return isWinner;
}

delegate(document.body, "click", "td", handleWinner);

function delegate(parent, type, selector, handler) {
  parent.addEventListener(type, function (event) {
    const targetElement = event.target.closest(selector);
    if (this.contains(targetElement)) handler.call(targetElement, event);
  });
}