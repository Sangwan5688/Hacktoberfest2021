function insertionSort(arr) {
  var n = arr.length;

  for (var i = 1; i < n; i++) {
    var current = arr[i];
    var j = i - 1;

    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = current;
  }
}

// Example usage:
var arr = [12, 11, 13, 5, 6];
insertionSort(arr);
console.log("Sorted array: " + arr);
