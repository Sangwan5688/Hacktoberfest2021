!function (window) {
  var
      equestAnimationFrame = 'equestAnimationFrame',
      requestAnimationFrame = 'r' + equestAnimationFrame,

      ancelAnimationFrame = 'ancelAnimationFrame',
      cancelAnimationFrame = 'c' + ancelAnimationFrame,

      expectedTime = 0,
      vendors = ['moz', 'ms', 'o', 'webkit'],
      vendor;

  while (!window[requestAnimationFrame] && (vendor = vendors.pop())) {
    window[requestAnimationFrame] = window[vendor + 'R' + equestAnimationFrame];
    window[cancelAnimationFrame] =
        window[vendor + 'C' + ancelAnimationFrame] ||
            window[vendor + 'CancelR' + equestAnimationFrame];
  }

  if (!window[requestAnimationFrame]) {
    window[requestAnimationFrame] = function (callback) {
      var
          currentTime = +new Date,
          adjustedDelay = 16 - (currentTime - expectedTime),
          delay = adjustedDelay > 0 ? adjustedDelay : 0;

      expectedTime = currentTime + delay;

      return setTimeout(function () {
        callback(expectedTime);
      }, delay);
    };

    window[cancelAnimationFrame] = clearTimeout;
  }
}(this);