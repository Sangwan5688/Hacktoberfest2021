void countingSort(List<int> arr) {
  int n = arr.length;
  int max = arr.reduce((curr, next) => curr > next ? curr : next);
  int min = arr.reduce((curr, next) => curr < next ? curr : next);
  int range = max - min + 1;

  List<int> count = List<int>.filled(range, 0);
  List<int> output = List<int>.filled(n, 0);

  for (int i = 0; i < n; i++) {
    count[arr[i] - min]++;
  }
  for (int i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }
  for (int i = n - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }
  for (int i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}
