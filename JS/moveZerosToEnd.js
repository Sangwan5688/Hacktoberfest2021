function moveZerosToEnd(arr) {
    let nonZeroIndex = 0; // Index to keep track of non-zero elements

    // Traverse the array and move non-zero elements to the front
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
            arr[nonZeroIndex] = arr[i];
            nonZeroIndex++;
        }
    }

    // Fill the remaining elements with zeros
    while (nonZeroIndex < arr.length) {
        arr[nonZeroIndex] = 0;
        nonZeroIndex++;
    }

    return arr;
}

// Example usage
let arr = [0, 2, 0, 4, 0, 6, 0, 8, 10, 0];
arr = moveZerosToEnd(arr);
console.log(arr);
