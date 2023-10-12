int binarySearch(List<int> arr, int target) {
  int left = 0;
  int right = arr.length - 1;

  while (left <= right) {
    int mid = left + (right - left) ~/ 2;

    if (arr[mid] == target) {
      return mid; // Return the index of the target element if found
    } else if (arr[mid] < target) {
      left = mid + 1; // Target is in the right half of the current subarray
    } else {
      right = mid - 1; // Target is in the left half of the current subarray
    }
  }

  return -1; // Return -1 if the target element is not found in the list
}

void main() {
  List<int> arr = [1, 3, 5, 7, 9, 11, 13, 15];
  int target = 7;

  int result = binarySearch(arr, target);

  if (result != -1) {
    print('Element $target found at index $result');
  } else {
    print('Element $target not found in the list');
  }
}
