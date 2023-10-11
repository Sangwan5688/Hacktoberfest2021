#include <stdio.h>

void mergeSort(int i, int j, int arr[], int sorted[]) {
    if (j <= i) return;

    int mid = (i + j) / 2;
    mergeSort(i, mid, arr, sorted);
    mergeSort(mid + 1, j, arr, sorted);

    //Merging
    int leftPointer = i;
    int rightPointer = mid + 1;
    int k;

    for (k = i; k <= j; k++) {
        if (leftPointer == mid + 1) {
            sorted[k] = arr[rightPointer];
            rightPointer++;
        } else if (rightPointer == j + 1) {
            sorted[k] = arr[leftPointer];
            leftPointer++;
        } else if (arr[leftPointer] < arr[rightPointer]) {
            sorted[k] = arr[leftPointer];
            leftPointer++;
        } else {
            sorted[k] = arr[rightPointer];
            rightPointer++;
        }
    }

    for (k = i; k <= j; k++) arr[k] = sorted[k];
}


int main() {
    int n, i, d, swap;
    scanf("%d", &n);
    int arr[n], sorted[n];
    for (i = 0; i < n; i++) scanf("%d", &arr[i]);

    mergeSort(0, n - 1, arr, sorted);

    for (i = 0; i < n; i++) printf("%d ", arr[i]);

return 0;
}

