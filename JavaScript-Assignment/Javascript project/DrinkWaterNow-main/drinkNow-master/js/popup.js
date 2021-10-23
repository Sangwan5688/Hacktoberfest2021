var bg = chrome.extension.getBackgroundPage();
var getHtml = document.getElementsByTagName("html")[0];
var getClock = document.getElementById("img");
var getImg = document.getElementById("clock");
var progressbar = document.getElementById("progressbar");
var light = bg.checklight();
var check = document.getElementById("toggle");
var duckwidth = bg.getduckwidth();

getClock.style.width = duckwidth + "%";

if (!light) {
    getImg.innerText = `WATER WATER!`;
    check.checked = true;
    getHtml.id = "htmlbg2";
    progressbar.id = "progressbar2";
}

var WandH = bg.getWandH();
getHtml.style.width = WandH.winWidth * 1 / 5 + "px";
getHtml.style.height = WandH.winHeight * 1 / 7 + "px";
console.log(getHtml.style.width);


getClock.style.left = `${bg.timer() - 10}%`;

if (Math.floor(bg.timer() * 36 / 60) == 60) {
    getImg.innerText = `DRINK WATER！`;
    getClock.src = "../img/dead.png";
}

document.getElementsByClassName("bar")[0].style.width = `${bg.timer()}%`;

document.getElementById("refresh").addEventListener("click", function (e) {

    bg.refresh();
    if (!light) {
        getClock.style.width = duckwidth - 2 + "%";
        bg.smallduck();
        duckwidth = duckwidth - 2;
    } else {
        getClock.style.width = duckwidth + 2 + "%";
        bg.duckbecomefat();
        duckwidth = duckwidth + 2;
    }
    getClock.src = "../img/imok.png";
    getImg.innerText = `DRINK GLUG GLUG！`;
    getClock.style.left = `-10%`;
    document.getElementsByClassName("bar")[0].style.width = `0%`;
});

document.getElementById("sun").addEventListener("click", function (e) {
    
    bg.turnlight();
    light = !light;
   
    if (bg.checklight()) {
        getImg.innerText = ``;
        check.checked = false;
        getHtml.id = "htmlbg";
        progressbar.id = "progressbar";
    } else {
        getImg.innerText = `DRINK WATER！`;
        check.checked = true;
        getHtml.id = "htmlbg2";
        progressbar.id = "progressbar2";
    }
});
