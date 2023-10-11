
#include <iostream>

using namespace std;

// Merges two sorted subarrays of the given array
void merge(int array[], int left, int mid, int right) {

  // Create temporary arrays to store the two subarrays
  int leftArray[mid - left + 1];
  int rightArray[right - mid];

  // Copy the elements of the left subarray to the temporary array
  for (int i = 0; i < mid - left + 1; i++) {
    leftArray[i] = array[left + i];
  }

  // Copy the elements of the right subarray to the temporary array
  for (int i = 0; i < right - mid; i++) {
    rightArray[i] = array[mid + 1 + i];
  }

  // Merge the two sorted subarrays back into the original array
  int i = 0;
  int j = 0;
  int k = left;
  while (i < mid - left + 1 && j < right - mid) {
    if (leftArray[i] <= rightArray[j]) {
      array[k] = leftArray[i];
      i++;
    } else {
      array[k] = rightArray[j];
      j++;
    }
    k++;
  }

  // Copy the remaining elements of the left subarray to the original array
  while (i < mid - left + 1) {
    array[k] = leftArray[i];
    i++;
    k++;
  }

  // Copy the remaining elements of the right subarray to the original array
  while (j < right - mid) {
    array[k] = rightArray[j];
    j++;
    k++;
  }
}

// Sorts the given array using the merge sort algorithm
void mergeSort(int array[], int left, int right) {
  if (left < right) {
    int mid = left + (right - left) / 2;

    // Sort the left subarray
    mergeSort(array, left, mid);

    // Sort the right subarray
    mergeSort(array, mid + 1, right);

    // Merge the two sorted subarrays
    merge(array, left, mid, right);
  }
}

int main() {
  int array[] = {5, 3, 2, 1, 4};
  int size = sizeof(array) / sizeof(array[0]);

  // Sort the array using the merge sort algorithm
  mergeSort(array, 0, size - 1);

  // Print the sorted array
  for (int i = 0; i < size; i++) {
    cout << array[i] << " ";
  }
  cout << endl;

  return 0;
}
