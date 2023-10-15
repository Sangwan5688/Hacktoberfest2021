extension RadixSort on List<int> {
  void radixSort() {
    const base = 10;
    var done = false;
    // 1
    var place = 1;
    while (!done) {
      done = true;
      // 2
      final buckets = List.generate(base, (_) => <int>[]);
      forEach((number) {
        // 3
        final remainingPart = number ~/ place;
        final digit = remainingPart % base;
        // 4
        buckets[digit].add(number);
        if (remainingPart ~/ base > 0) {
          done = false;
        }
      });
      // 5
      place *= base;
      clear();
      addAll(buckets.expand((element) => element));
    }
  }
}
