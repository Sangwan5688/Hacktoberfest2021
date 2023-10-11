document.addEventListener('DOMContentLoaded', function() {
  showText("#welcome", "Welcome", 0, 300);
});
let showText = function (target, message, index, interval) {
  if (index < message.length) {
    document.querySelector(target).innerHTML = document.querySelector(target).innerHTML + message[index++];
    setTimeout(function () {
      showText(target, message, index, interval);
    },interval);
  }
}
