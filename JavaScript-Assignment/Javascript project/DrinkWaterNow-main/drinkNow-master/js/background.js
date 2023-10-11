var count = 0;
var winWidth = 1440;
var winHeight = 860;
var notificationId;
var countdownId = 0;
var light = true;
var duckwidth = 15;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    winWidth = request.winWidth;
    winHeight = request.winHeight;
    sendResponse('');
});

function duckbecomeslim() {
    duckwidth = duckwidth - 4;
}

function duckbecomefat() {
    duckwidth = duckwidth + 2;
}

function smallduck() {
    duckwidth = duckwidth - 2;
}

function getduckwidth() {
    return duckwidth;
}

function checklight() {
    return light
}

function turnlight() {
    light = !light;
}

function timer() {
   
    if (!light) {
        return count / 36
    }
    if (count < 3600) {
        count++;
        //badge
        chrome.browserAction.setBadgeText({
            text: Math.floor(count / 60) + ''
        });
        chrome.browserAction.setBadgeBackgroundColor({
            color: "#70d2c9"
        });
    }
    ！
    if (count == 3600) {
        duckbecomeslim();
        notificationAction();
        count++;
    }
    if (count >= 3600) {
        
        chrome.browserAction.setBadgeText({
            text: 'sos'
        });
        chrome.browserAction.setBadgeBackgroundColor({
            color: [255, 0, 0, 255]
        });
    }
    return count / 36
}

function refresh() {
    count = 0;
    
    window.clearInterval(countdownId);
}

var fivemin = 0;
var Countdown = function () {
    fivemin++;
    if (fivemin == 300) {
        notificationAction();
        fivemin = 0;
    }
};

function notificationAction() {
   
    chrome.notifications.clear("1",
        (id) => {

        });
    chrome.notifications.create("1", {
        type: 'basic',
        iconUrl: 'img/logo.png',
        title: 'Cheers',
        buttons: [{
            title: "Hurray",
            iconUrl: 'img/yellowsmile.png'
        }, {
            title: "Shit",
            iconUrl: 'img/redsmile.png'
        }],
        message: 'DRINK WATER！'
    });
}

chrome.notifications.onButtonClicked.addListener(function (id, btnIndex) {
    count = btnIndex ? count : 0;
});

function getWandH() {
    var WandH = {
        winWidth: winWidth,
        winHeight: winHeight
    }
    return WandH
}

setInterval(timer, 1000);
