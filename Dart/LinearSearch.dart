int linearSearch(List<int> arr, int target) {
  for (int i = 0; i < arr.length; i++) {
    if (arr[i] == target) {
      return i; // Return the index of the target element if found
    }
  }
  return -1; // Return -1 if the target element is not found in the list
}

void main() {
  List<int> arr = [5, 2, 9, 1, 5, 6];
  int target = 9;

  int result = linearSearch(arr, target);

  if (result != -1) {
    print('Element $target found at index $result');
  } else {
    print('Element $target not found in the list');
  }
}
