#include <iostream>

void moveZerosToEnd(int arr[], int size) {
    int nonZeroIndex = 0; // Index to keep track of non-zero elements

    // Traverse the array and move non-zero elements to the front
    for (int i = 0; i < size; i++) {
        if (arr[i] != 0) {
            arr[nonZeroIndex] = arr[i];
            nonZeroIndex++;
        }
    }

    // Fill the remaining elements with zeros
    while (nonZeroIndex < size) {
        arr[nonZeroIndex] = 0;
        nonZeroIndex++;
    }
}

int main() {
    int arr[] = {0, 2, 0, 4, 0, 6, 0, 8, 10, 0};
    int size = sizeof(arr) / sizeof(arr[0]);

    moveZerosToEnd(arr, size);

    // Print the modified array
    for (int i = 0; i < size; i++) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;

    return 0;
}
