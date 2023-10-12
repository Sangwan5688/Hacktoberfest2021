#include <stdio.h>
#include <stdlib.h>

void countingSort(int arr[], int n) {
    // Find the maximum element in the array to determine the range
    int max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }

    // Create a count array to store the count of each element
    int* count = (int*)calloc(max + 1, sizeof(int));

    // Count the occurrences of each element
    for (int i = 0; i < n; i++) {
        count[arr[i]]++;
    }

    // Reconstruct the sorted array from the count array
    int output[n];
    int outputIndex = 0;
    for (int i = 0; i <= max; i++) {
        while (count[i] > 0) {
            output[outputIndex] = i;
            outputIndex++;
            count[i]--;
        }
    }

    // Copy the sorted elements back to the original array
    for (int i = 0; i < n; i++) {
        arr[i] = output[i];
    }

    // Free the dynamically allocated count array
    free(count);
}

int main() {
    int arr[] = {4, 2, 2, 8, 3, 3, 1};
    int n = sizeof(arr) / sizeof(arr[0]);

    countingSort(arr, n);

    printf("Sorted array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    return 0;
}
