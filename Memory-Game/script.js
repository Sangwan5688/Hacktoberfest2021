const page = document.querySelector(".container");
const frame = document.querySelector(".frame");
const inner = document.querySelector(".inner");
const refresh = document.querySelectorAll(".refresh");

let allBoxs;
let errorBox = document.querySelectorAll(".box");
let popup = document.querySelectorAll(".popup-wrapper");
let error = 0;
let greenbox;
let redbox;

let levelset = {
  4: [4, 4],
  5: [5, 4],
  6: [5, 5],
  7: [6, 5],
};
let currentlevel = 4;
let leftright;
let selectedcol;

const randomgenerator = (row, col) => {
  greenbox = [];
  redbox = [];
  selectedcol = 0;
  leftright = [];
  for (i = 0; i < row; i++) {
    let count = 0;
    let x = Math.floor(Math.random() * 2) + 1;
    let r = [];
    while (count != x) {
      let c = Math.floor(Math.random() * col);
      if (!r.includes(c)) {
        r.push(c);
        count++;
      }
    }
    leftright.push(r);
  }
  console.log(leftright);
};

//Function to generate array
const arrayChecker = (row, col) => {
  inner.innerHTML = "";
  //Generating Div Column
  for (j = 0; j < row; j++) {
    const column = document.createElement("div");
    column.setAttribute("id", `col ${j}`);
    column.style.flexGrow = "1";

    //Generating li tags
    for (i = 0; i < col; i++) {
      //creating grid according to array
      const li = document.createElement("li");
      li.setAttribute("ID", `${j} ${i}`);
      li.innerText = ``;
      //Making grid white according to array
      column.appendChild(li);
      if (leftright[j].includes(i)) {
        li.style.backgroundColor = "white";
      }
    }
    inner.appendChild(column);
  }
  setTimeout(function () {}, 1010);
};

const clickedhighlight = () => {
  allBoxs = document.querySelectorAll("li");
  allBoxs.forEach((item) => {
    if (greenbox.includes(item.id)) {
      item.style.backgroundColor = "green";
    }
    if (redbox.includes(item.id)) {
      item.style.backgroundColor = "red";
    }
  });
};

const game = (row, col) => {
  inner.innerHTML = "";
  //Generating Div Column
  for (j = 0; j < row; j++) {
    const column = document.createElement("div");
    column.setAttribute("id", `col ${j}`);
    column.style.flexGrow = "1";

    //Generating li tags
    for (i = 0; i < col; i++) {
      //creating grid according to array
      const li = document.createElement("li");
      li.setAttribute("ID", `${j} ${i}`);
      li.innerText = ``;
      if (selectedcol == j) {
        li.style.backgroundColor = "white";
      }
      //Making grid white according to array
      column.appendChild(li);
    }
    inner.appendChild(column);
  }
  clickedhighlight();
  allBoxs = document.querySelectorAll("li");
  allBoxs.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.id[0] == selectedcol) {
        if (leftright[selectedcol].includes(Number(e.target.id[2]))) {
          e.target.style.backgroundColor = "green";
          greenbox.push(e.target.id);
          for (i = 0; i < leftright[selectedcol].length; i++) {
            if (leftright[selectedcol][i] == Number(e.target.id[2])) {
              leftright[selectedcol].splice(i, 1);
              break;
            }
          }
          if (leftright[selectedcol].length == 0) {
            selectedcol++;
            if (selectedcol == row) {
              currentlevel++;
              if (currentlevel == 8) {
                popup[1].style.display = "block";
              } else {
                fullGrid(currentlevel);
              }
            } else {
              game(row, col);
            }
          }
        } else {
          redbox.push(e.target.id);
          e.target.style.backgroundColor = "red";
          error++;
        }

        for (i = 0; i < error; i++) {
          errorBox[i].style.backgroundColor = "#901500";
          if (error === 3) {
            popup[0].style.display = "block";
          }
        }
      } else {
        console.log("wrong");
      }
    });
  });
};

const fullGrid = (level) => {
  randomgenerator(levelset[level][0], levelset[level][1]);
  arrayChecker(levelset[level][0], levelset[level][1]);
  setTimeout(function () {
    game(levelset[level][0], levelset[level][1]);
  }, 1800);
};

refresh[0].addEventListener("click", (e) => {
  window.location.reload();
});
refresh[1].addEventListener("click", (e) => {
  window.location.reload();
});

fullGrid(4);
