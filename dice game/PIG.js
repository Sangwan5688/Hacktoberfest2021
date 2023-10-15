var x = document.querySelector(".DRoll");
var u = document.querySelector(".DHold");
var n = document.querySelector(".New_Button");
var p = 1;
var P1 = document.querySelector(".ScoreP1");
var P2 = document.querySelector(".ScoreP2");
var curScore1 = 0;
var curScore2 = 0;
var totScore1 = 0;
var totScore2 = 0;
var z1 = document.getElementById("score1");
var z2 = document.getElementById("score2");

function Holder() {
    let t1 = document.getElementById("Frame1");
    let t2 = document.getElementById("Frame2");
    let h1 = document.getElementById("head1");
    let h2 = document.getElementById("head2");

    if (p == 1) {
        t2.classList.remove("colChanger");
        t1.classList.add("colChanger");
        h2.classList.remove("hidden");
        h1.classList.add("hidden");
        z1.innerText = 0;
        totScore1 += curScore1;
        if (totScore1 >= 100) {
            t1.classList.add("winChanger");
            x.classList.add("hidden");
            u.classList.add("hidden");
            P1.innerHTML = "WINNER";
            document.getElementById("SP1").classList.remove("ScoreP2");
            document.getElementById("SP1").classList.add("ScorePa");
        } else {
            P1.innerHTML = totScore1;
            curScore1 = 0;
            p++;
        }
    } else if (p == 2) {
        t1.classList.remove("colChanger");
        t2.classList.add("colChanger");
        h1.classList.remove("hidden");
        h2.classList.add("hidden");
        z2.innerText = 0;
        totScore2 += curScore2;

        if (totScore2 >= 100) {
            t2.classList.add("winChanger");
            x.classList.add("hidden");
            u.classList.add("hidden");
            P2.innerHTML = "WINNER";
            document.getElementById("SP2").classList.remove("ScoreP2");
            document.getElementById("SP2").classList.add("ScorePb");
        } else {
            P2.innerHTML = totScore2;
            curScore2 = 0;
            p--;
        }
    }
}

x.addEventListener("click", function () {
    var y = document.querySelector(".Dice");
    var i = Math.floor(Math.random() * Math.floor(6)) + 1;
    var j = i.toString();
    y.src = "Frame " + j + ".png";

    if (p == 1 && i != 1) {
        curScore1 += i;
        z1.innerText = curScore1;
    } else if (p == 2 && i != 1) {
        curScore2 += i;
        z2.innerText = curScore2;
    } else {
        totScore1 += curScore1;
        totScore2 += curScore2;
        curScore1 = 0;
        curScore2 = 0;
        Holder();
    }
});

u.addEventListener("click", Holder);

n.addEventListener("click", function () {
    location.reload();
});
