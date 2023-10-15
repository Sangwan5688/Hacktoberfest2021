List<int> mergeSort(List<int> arr) {
  int n = arr.length;
  if (n <= 1) {
    return arr;
  }
  int mid = n ~/ 2;
  List<int> left = mergeSort(arr.sublist(0, mid));
  List<int> right = mergeSort(arr.sublist(mid));
  return merge(left, right);
}

List<int> merge(List<int> left, List<int> right) {
  List<int> result = [];
  int i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.add(left[i]);
      i++;
    } else {
      result.add(right[j]);
      j++;
    }
  }
  result.addAll(left.sublist(i));
  result.addAll(right.sublist(j));
  return result;
}
