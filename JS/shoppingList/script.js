const button = document.getElementById("enter");
const input = document.getElementById("userinput");
const ul = document.querySelector("ul");
let flag = 0;
const li = document.getElementsByTagName("li");

for (let i = 0; i < li.length; i++) {
    li[i].addEventListener("click", function () {
        if (flag === 0) {
            flag = 1;
            this.classList.add("done");
        } else {
            flag = 0;
            this.classList.remove("done");
        }
    })
}

function inputLength() {
    return input.value.length;
}

function createListElement() {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(input.value));
    li.onclick = function () {
        if (flag === 0) {
            flag = 1;
            this.classList.add("done");
        } else {
            flag = 0;
            this.classList.remove("done");
        }
    };

    const buttonList = document.createElement("button");
    buttonList.classList.add("delete");
    buttonList.onclick = function () {
        this.parentElement.remove()
    };
    buttonList.appendChild(document.createTextNode("Delete"));

    const div = document.createElement("div");
    div.appendChild(li);
    div.appendChild(buttonList);
    ul.appendChild(div);
    input.value = "";
}

function addListAfterClick() {
    if (inputLength() > 0) {
        createListElement();
    }
}

function addListAfterKeypress(event) {
    if (inputLength() > 0 && event.keyCode === 13) {
        createListElement();
    }
}

button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

