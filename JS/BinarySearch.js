function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // Target element found, return its index
    } else if (arr[mid] < target) {
      left = mid + 1; // Target is in the right half of the current subarray
    } else {
      right = mid - 1; // Target is in the left half of the current subarray
    }
  }

  return -1; // Target element not found in the array
}

// Example usage:
const arr = [1, 3, 5, 7, 9, 11, 13, 15];
const target = 7;
const result = binarySearch(arr, target);

if (result !== -1) {
  console.log(`Element ${target} found at index ${result}`);
} else {
  console.log(`Element ${target} not found in the array`);
}
