function countingSort(arr) {
  const n = arr.length;

  // Find the maximum element in the array to determine the range of values.
  let max = arr[0];
  for (let i = 1; i < n; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  // Create a count array to store the count of each element.
  const count = new Array(max + 1).fill(0);

  // Count the occurrences of each element.
  for (let i = 0; i < n; i++) {
    count[arr[i]]++;
  }

  // Reconstruct the sorted array from the count array.
  let outputIndex = 0;
  for (let i = 0; i <= max; i++) {
    while (count[i] > 0) {
      arr[outputIndex] = i;
      outputIndex++;
      count[i]--;
    }
  }
}

// Example usage:
const arr = [4, 2, 2, 8, 3, 3, 1];
countingSort(arr);
console.log("Sorted array: " + arr);
