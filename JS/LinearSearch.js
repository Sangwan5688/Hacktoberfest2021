function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Return the index of the target element if found
    }
  }
  return -1; // Return -1 if the target element is not found in the array
}

// Example usage:
const arr = [3, 7, 1, 9, 4, 2];
const target = 9;
const result = linearSearch(arr, target);

if (result !== -1) {
  console.log(`Element ${target} found at index ${result}`);
} else {
  console.log(`Element ${target} not found in the array`);
}
