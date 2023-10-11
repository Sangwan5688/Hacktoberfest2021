var winWidth, winHeight;

winWidth = window.screen.width;
winHeight = window.screen.height;

chrome.runtime.sendMessage({
	winWidth: winWidth,
	winHeight: winHeight
}, function (response) {
});
