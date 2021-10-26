$(document).ready(function(){
    var lang = "c";
    var algo = "b";

    var cCode = {
        "Bubble":'<div>// C program for implementation of Bubble sort</div><div>#include <&nbsp;stdio.h&nbsp;> </div><div>void swap(int *xp, int *yp) </div><div>{ </div><div>int temp = *xp; </div><div>*xp = *yp; </div><div>*yp = temp; </div><div>} </div><div>// A function to implement bubble sort </div><div>void bubbleSort(int arr[], int n) </div><div>{ </div><div>int i, j; </div><div>for (i = 0; i < n-1; i++) </div><div>// Last i elements are already in place </div><div>for (j = 0; j < n-i-1; j++) </div><div>if (arr[j] > arr[j+1]) </div><div>swap(&arr[j], &arr[j+1]); </div><div>} </div><div>/* Function to print an array */</div><div>void printArray(int arr[], int size) </div><div>{ </div><div>int i; </div><div>for (i=0; i < size; i++) </div><div>printf("%d ", arr[i]); </div><div>printf(\"\\n\"); </div><div>} </div><div>// Driver program to test above functions </div><div>int main() </div><div>{ </div><div>int arr[] = {64, 34, 25, 12, 22, 11, 90}; </div><div>int n = sizeof(arr)/sizeof(arr[0]); </div><div>bubbleSort(arr, n); </div><div>printf("Sorted array: "); </div><div>printArray(arr, n); </div><div>return 0; </div><div>} </div>',
        "Select":'<div>// C program for implementation of Selection sort </div><div>#include <&nbsp;stdio.h&nbsp;> </div><div>void swap(int *xp, int *yp) </div><div>{ </div><div>int temp = *xp; </div><div>*xp = *yp; </div><div>*yp = temp; </div><div>} </div><div>void selectionSort(int arr[], int n) </div><div>{ </div><div>int i, j, min_idx; </div><div>// One by one move boundary of unsorted subarray </div><div>for (i = 0; i < n-1; i++) </div><div>{ </div><div>// Find the minimum element in unsorted array </div><div>min_idx = i; </div><div>for (j = i+1; j < n; j++) </div><div>if (arr[j] < arr[min_idx]) </div><div>min_idx = j; </div><div>// Swap the found minimum element with the first element </div><div>swap(&arr[min_idx], &arr[i]); </div><div>} </div><div>} </div><div>/* Function to print an array */</div><div>void printArray(int arr[], int size) </div><div>{ </div><div>int i; </div><div>for (i=0; i < size; i++) </div><div>printf("%d ", arr[i]); </div><div>printf(\"\\n\"); </div><div>} </div><div>// Driver program to test above functions </div><div>int main() </div><div>{ </div><div>int arr[] = {64, 25, 12, 22, 11}; </div><div>int n = sizeof(arr)/sizeof(arr[0]); </div><div>selectionSort(arr, n); </div><div>printf(\"Sorted array: \\n\"); </div><div>printArray(arr, n); </div><div>return 0; </div><div>} </div>',
        "Insert":'<div>// C program for implementation of Insertion sort </div><div>#include <&nbsp;math.h&nbsp;> </div><div>#include <&nbsp;stdio.h&nbsp;> </div><div>/* Function to sort an array using insertion sort*/</div><div>void insertionSort(int arr[], int n) </div><div>{ </div><div>int i, key, j; </div><div>for (i = 1; i < n; i++) { </div><div>key = arr[i]; </div><div>j = i - 1; </div><div>/* Move elements of arr[0..i-1], that are </div><div>greater than key, to one position ahead </div><div>of their current position */</div><div>while (j >= 0 && arr[j] > key) { </div><div>arr[j + 1] = arr[j]; </div><div>j = j - 1; </div><div>} </div><div>arr[j + 1] = key; </div><div>} </div><div>} </div><div>// A utility function to print an array of size n </div><div>void printArray(int arr[], int n) </div><div>{ </div><div>int i; </div><div>for (i = 0; i < n; i++) </div><div>printf("%d ", arr[i]); </div><div>printf(\"\\n\"); </div><div>} </div><div>/* Driver program to test insertion sort */</div><div>int main() </div><div>{ </div><div>int arr[] = { 12, 11, 13, 5, 6 }; </div><div>int n = sizeof(arr) / sizeof(arr[0]); </div><div>insertionSort(arr, n); </div><div>printArray(arr, n); </div><div>return 0; </div><div>} </div>',
        "Quick":'<div>// C program for implementation of Quick sort</div><div>#include<&nbsp;stdio.h&nbsp;> </div><div>// A utility function to swap two elements </div><div>void swap(int* a, int* b) </div><div>{ </div><div>int t = *a; </div><div>*a = *b; </div><div>*b = t; </div><div>} </div><div>/* This function takes last element as pivot, places </div><div>the pivot element at its correct position in sorted </div><div>array, and places all smaller (smaller than pivot) </div><div>to left of pivot and all greater elements to right </div><div>of pivot */</div><div>int partition (int arr[], int low, int high) </div><div>{ </div><div>int pivot = arr[high]; // pivot </div><div>int i = (low - 1); // Index of smaller element </div><div>for (int j = low; j <= high- 1; j++) </div><div>{ </div><div>// If current element is smaller than the pivot </div><div>if (arr[j] < pivot) </div><div>{ </div><div>i++; // increment index of smaller element </div><div>swap(&arr[i], &arr[j]); </div><div>} </div><div>} </div><div>swap(&arr[i + 1], &arr[high]); </div><div>return (i + 1); </div><div>} </div><div>/* The main function that implements QuickSort </div><div>arr[] --> Array to be sorted, </div><div>low --> Starting index, </div><div>high --> Ending index */</div><div>void quickSort(int arr[], int low, int high) </div><div>{ </div><div>if (low < high) </div><div>{ </div><div>/* pi is partitioning index, arr[p] is now </div><div>at right place */</div><div>int pi = partition(arr, low, high); </div><div>// Separately sort elements before </div><div>// partition and after partition </div><div>quickSort(arr, low, pi - 1); </div><div>quickSort(arr, pi + 1, high); </div><div>} </div><div>} </div><div>/* Function to print an array */</div><div>void printArray(int arr[], int size) </div><div>{ </div><div>int i; </div><div>for (i=0; i < size; i++) </div><div>printf("%d ", arr[i]); </div><div>printf(\"\\n\"); </div><div>} </div><div>// Driver program to test above functions </div><div>int main() </div><div>{ </div><div>int arr[] = {10, 7, 8, 9, 1, 5}; </div><div>int n = sizeof(arr)/sizeof(arr[0]); </div><div>quickSort(arr, 0, n-1); </div><div>printf(\"Sorted array: \\n\"); </div><div>printArray(arr, n); </div><div>return 0; </div><div>} </div>'
    }
    var cppCode = {
        "Bubble":'<div>// C++ program for implementation of Bubble sort </div><div>#include <&nbsp;bits/stdc++.h&nbsp;> </div><div>using namespace std; </div><div>void swap(int *xp, int *yp) </div><div>{ </div><div>int temp = *xp; </div><div>*xp = *yp; </div><div>*yp = temp; </div><div>} </div><div>// A function to implement bubble sort </div><div>void bubbleSort(int arr[], int n) </div><div>{ </div><div>int i, j; </div><div>for (i = 0; i < n-1; i++) </div><div></div><div>// Last i elements are already in place </div><div>for (j = 0; j < n-i-1; j++) </div><div>if (arr[j] > arr[j+1]) </div><div>swap(&arr[j], &arr[j+1]); </div><div>} </div><div>/* Function to print an array */</div><div>void printArray(int arr[], int size) </div><div>{ </div><div>int i; </div><div>for (i = 0; i < size; i++) </div><div>cout << arr[i] << " "; </div><div>cout << endl; </div><div>} </div><div>// Driver code </div><div>int main() </div><div>{ </div><div>int arr[] = {64, 34, 25, 12, 22, 11, 90}; </div><div>int n = sizeof(arr)/sizeof(arr[0]); </div><div>bubbleSort(arr, n); </div><div>cout<<\"Sorted array: \\n\"; </div><div>printArray(arr, n); </div><div>return 0; </div><div>} </div><div>//Source : Geeksforgeeks</div>',
        "Select":'<div>// C++ program for implementation of Selection sort </div><div>#include <&nbsp;bits/stdc++.h&nbsp;> </div><div>using namespace std; </div><div>void swap(int *xp, int *yp) </div><div>{ </div><div>int temp = *xp; </div><div>*xp = *yp; </div><div>*yp = temp; </div><div>} </div><div>void selectionSort(int arr[], int n) </div><div>{ </div><div>int i, j, min_idx; </div><div>// One by one move boundary of unsorted subarray </div><div>for (i = 0; i < n-1; i++) </div><div>{ </div><div>// Find the minimum element in unsorted array </div><div>min_idx = i; </div><div>for (j = i+1; j < n; j++) </div><div>if (arr[j] < arr[min_idx]) </div><div>min_idx = j; </div><div>// Swap the found minimum element with the first element </div><div>swap(&arr[min_idx], &arr[i]); </div><div>} </div><div>} </div><div>/* Function to print an array */</div><div>void printArray(int arr[], int size) </div><div>{ </div><div>int i; </div><div>for (i=0; i < size; i++) </div><div>cout << arr[i] << " "; </div><div>cout << endl; </div><div>} </div><div>// Driver program to test above functions </div><div>int main() </div><div>{ </div><div>int arr[] = {64, 25, 12, 22, 11}; </div><div>int n = sizeof(arr)/sizeof(arr[0]); </div><div>selectionSort(arr, n); </div><div>cout << \"Sorted array: \\n\"; </div><div>printArray(arr, n); </div><div>return 0; </div><div>} </div><div>// This is code is contributed by rathbhupendra </div>',
        "Insert":'<div>//C++ program for implementation of Insertion sort </div><div>#include <&nbsp;bits/stdc++.h&nbsp;> </div><div>using namespace std; </div><div>/* Function to sort an array using insertion sort*/</div><div>void insertionSort(int arr[], int n) </div><div>{ </div><div>int i, key, j; </div><div>for (i = 1; i < n; i++) </div><div>{ </div><div>key = arr[i]; </div><div>j = i - 1; </div><div>/* Move elements of arr[0..i-1], that are </div><div>greater than key, to one position ahead </div><div>of their current position */</div><div>while (j >= 0 && arr[j] > key) </div><div>{ </div><div>arr[j + 1] = arr[j]; </div><div>j = j - 1; </div><div>} </div><div>arr[j + 1] = key; </div><div>} </div><div>} </div><div>// A utility function to print an array of size n </div><div>void printArray(int arr[], int n) </div><div>{ </div><div>int i; </div><div>for (i = 0; i < n; i++) </div><div>cout << arr[i] << " "; </div><div>cout << endl; </div><div>} </div><div>/* Driver code */</div><div>int main() </div><div>{ </div><div>int arr[] = { 12, 11, 13, 5, 6 }; </div><div>int n = sizeof(arr) / sizeof(arr[0]); </div><div>insertionSort(arr, n); </div><div>printArray(arr, n); </div><div>return 0; </div><div>} </div><div>// This is code is contributed by rathbhupendra </div>',
        "Quick":'<div>// C++ program for implementation of Quick sort </div><div>#include <&nbsp;bits/stdc++.h&nbsp;> </div><div>using namespace std; </div><div>// A utility function to swap two elements </div><div>void swap(int* a, int* b) </div><div>{ </div><div>int t = *a; </div><div>*a = *b; </div><div>*b = t; </div><div>} </div><div>int partition (int arr[], int low, int high) </div><div>{ </div><div>int pivot = arr[high]; // pivot </div><div>int i = (low - 1); // Index of smaller element </div><div>for (int j = low; j <= high - 1; j++) </div><div>{ </div><div>// If current element is smaller than the pivot </div><div>if (arr[j] < pivot) </div><div>{ </div><div>i++; // increment index of smaller element </div><div>swap(&arr[i], &arr[j]); </div><div>} </div><div>} </div><div>swap(&arr[i + 1], &arr[high]); </div><div>return (i + 1); </div><div>} </div><div>/* The main function that implements QuickSort </div><div>arr[] --> Array to be sorted, </div><div>low --> Starting index, </div><div>high --> Ending index */</div><div>void quickSort(int arr[], int low, int high) </div><div>{ </div><div>if (low < high) </div><div>{ </div><div>/* pi is partitioning index, arr[p] is now </div><div>at right place */</div><div>int pi = partition(arr, low, high); </div><div>// Separately sort elements before </div><div>// partition and after partition </div><div>quickSort(arr, low, pi - 1); </div><div>quickSort(arr, pi + 1, high); </div><div>} </div><div>} </div><div>/* Function to print an array */</div><div>void printArray(int arr[], int size) </div><div>{ </div><div>int i; </div><div>for (i = 0; i < size; i++) </div><div>cout << arr[i] << " "; </div><div>cout << endl; </div><div>} </div><div>// Driver Code </div><div>int main() </div><div>{ </div><div>int arr[] = {10, 7, 8, 9, 1, 5}; </div><div>int n = sizeof(arr) / sizeof(arr[0]); </div><div>quickSort(arr, 0, n - 1); </div><div>cout << \"Sorted array: \n\"; </div><div>printArray(arr, n); </div><div>return 0; </div><div>} </div><div>// Source : GeeksforGeeks </div>'
    }

    var javaCode = {
        "Bubble":'<div>// Java program for implementation of Bubble Sort </div><div>class BubbleSort </div><div>{ </div><div>void bubbleSort(int arr[]) </div><div>{ </div><div>int n = arr.length; </div><div>for (int i = 0; i < n-1; i++) </div><div>for (int j = 0; j < n-i-1; j++) </div><div>if (arr[j] > arr[j+1]) </div><div>{ </div><div>// swap arr[j+1] and arr[j] </div><div>int temp = arr[j]; </div><div>arr[j] = arr[j+1]; </div><div>arr[j+1] = temp; </div><div>} </div><div>} </div><div>/* Prints the array */</div><div>void printArray(int arr[]) </div><div>{ </div><div>int n = arr.length; </div><div>for ( int i = 0 ; i < n ; ++i ) </div><div>System.out.print(arr[i] + " "); </div><div>System.out.println(); </div><div>} </div><div>// Driver method to test above </div><div>public static void main(String args[]) </div><div>{ </div><div>BubbleSort ob = new BubbleSort(); </div><div>int arr[] = {64, 34, 25, 12, 22, 11, 90}; </div><div>ob.bubbleSort(arr); </div><div>System.out.println("Sorted array"); </div><div>ob.printArray(arr); </div><div>} </div><div>} </div><div>/* GeeksforGeeks */</div>',
        "Select":'<div>// Java program for implementation of Selection Sort </div><div>class SelectionSort </div><div>{ </div><div>void sort(int arr[]) </div><div>{ </div><div>int n = arr.length; </div><div>// One by one move boundary of unsorted subarray </div><div>for (int i = 0; i < n-1; i++) </div><div>{ </div><div>// Find the minimum element in unsorted array </div><div>int min_idx = i; </div><div>for (int j = i+1; j < n; j++) </div><div>if (arr[j] < arr[min_idx]) </div><div>min_idx = j; </div><div>// Swap the found minimum element with the first </div><div>// element </div><div>int temp = arr[min_idx]; </div><div>arr[min_idx] = arr[i]; </div><div>arr[i] = temp; </div><div>} </div><div>} </div><div>// Prints the array </div><div>void printArray(int arr[]) </div><div>{ </div><div>int n = arr.length; </div><div>for ( int i = 0; i < n; ++i) </div><div>System.out.print(arr[i]+" "); </div><div>System.out.println(); </div><div>} </div><div>// Driver code to test above </div><div>public static void main(String args[]) </div><div>{ </div><div>SelectionSort ob = new SelectionSort(); </div><div>int arr[] = {64,25,12,22,11}; </div><div>ob.sort(arr); </div><div>System.out.println("Sorted array"); </div><div>ob.printArray(arr); </div><div>} </div><div>} </div><div>/* This code is contributed by Rajat Mishra*/</div>  ',
        "Insert":'<div>// Java program for implementation of Insertion Sort </div><div>class InsertionSort { </div><div>/*Function to sort array using insertion sort*/</div><div>void sort(int arr[]) </div><div>{ </div><div>int n = arr.length; </div><div>for (int i = 1; i < n; ++i) { </div><div>int key = arr[i]; </div><div>int j = i - 1; </div><div>/* Move elements of arr[0..i-1], that are </div><div>greater than key, to one position ahead </div><div>of their current position */</div><div>while (j >= 0 && arr[j] > key) { </div><div>arr[j + 1] = arr[j]; </div><div>j = j - 1; </div><div>} </div><div>arr[j + 1] = key; </div><div>} </div><div>} </div><div>/* A utility function to print array of size n*/</div><div>static void printArray(int arr[]) </div><div>{ </div><div>int n = arr.length; </div><div>for (int i = 0; i < n; ++i) </div><div>System.out.print(arr[i] + " "); </div><div>System.out.println(); </div><div>} </div><div>// Driver method </div><div>public static void main(String args[]) </div><div>{ </div><div>int arr[] = { 12, 11, 13, 5, 6 }; </div><div>InsertionSort ob = new InsertionSort(); </div><div>ob.sort(arr); </div><div>printArray(arr); </div><div>} </div><div>} /* This code is contributed by Rajat Mishra. */</div>',
        "Quick":'<div>// Java program for implementation of QuickSort </div><div>class QuickSort </div><div>{ </div><div>int partition(int arr[], int low, int high) </div><div>{ </div><div>int pivot = arr[high]; </div><div>int i = (low-1); // index of smaller element </div><div>for ( int j = low; j < high; j++) </div><div>{ </div><div>// If current element is smaller than the pivot </div><div>if (arr[j] < pivot) </div><div>{ </div><div>i++; </div><div>// swap arr[i] and arr[j] </div><div>int temp = arr[i]; </div><div>arr[i] = arr[j]; </div><div>arr[j] = temp; </div><div>} </div><div>} </div><div>// swap arr[i+1] and arr[high] (or pivot) </div><div>int temp = arr[i+1]; </div><div>arr[i+1] = arr[high]; </div><div>arr[high] = temp; </div><div>return i+1; </div><div>} </div><div>void sort(int arr[], int low, int high) </div><div>{ </div><div>if (low < high) </div><div>{ </div><div>/* pi is partitioning index, arr[pi] is </div><div>now at right place */</div><div>int pi = partition(arr, low, high); </div><div>// Recursively sort elements before </div><div>// partition and after partition </div><div>sort(arr, low, pi-1); </div><div>sort(arr, pi+1, high); </div><div>} </div><div>} </div><div>/* A utility function to print array of size n */</div><div>static void printArray(int arr[]) </div><div>{ </div><div>int n = arr.length; </div><div>for ( int i = 0; i < n; ++i ) </div><div>System.out.print(arr[i]+" "); </div><div>System.out.println(); </div><div>} </div><div>// Driver program </div><div>public static void main(String args[]) </div><div>{ </div><div>int arr[] = {10, 7, 8, 9, 1, 5}; </div><div>int n = arr.length; </div><div>QuickSort ob = new QuickSort(); </div><div>ob.sort(arr, 0, n-1); </div><div>System.out.println("sorted array"); </div><div>printArray(arr); </div><div>} </div><div>} </div><div>/*Source : GeekforGeeks*/</div>'
    }

    var pyCode = {
        "Bubble":'<div># Python program for implementation of Bubble Sort </div><div>def bubbleSort(arr): </div><div>&nbsp;&nbsp;&nbsp;&nbsp;n = len(arr) </div><div>&nbsp;&nbsp;&nbsp;&nbsp;# Traverse through all array elements </div><div>&nbsp;&nbsp;&nbsp;&nbsp;for i in range(n): </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Last i elements are already in place </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for j in range(0, n-i-1): </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# traverse the array from 0 to n-i-1 </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Swap if the element found is greater </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# than the next element </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if arr[j] > arr[j+1] : </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[j], arr[j+1] = arr[j+1], arr[j] </div><div># Driver code to test above </div><div>arr = [64, 34, 25, 12, 22, 11, 90] </div><div>bubbleSort(arr) </div><div>print ("Sorted array is:") </div><div>for i in range(len(arr)): </div><div>&nbsp;&nbsp;&nbsp;&nbsp;print ("%d" %arr[i]) </div>',
        "Select":'<div># Python program for implementation of Selection </div><div># Sort </div><div>import sys </div><div>A = [64, 25, 12, 22, 11] </div><div># Traverse through all array elements </div><div>for i in range(len(A)): </div><div>&nbsp;&nbsp;&nbsp;&nbsp;</div><div>&nbsp;&nbsp;&nbsp;&nbsp;# Find the minimum element in remaining </div><div>&nbsp;&nbsp;&nbsp;&nbsp;# unsorted array </div><div>&nbsp;&nbsp;&nbsp;&nbsp;min_idx = i </div><div>&nbsp;&nbsp;&nbsp;&nbsp;for j in range(i+1, len(A)): </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if A[min_idx] > A[j]: </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min_idx = j </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div>&nbsp;&nbsp;&nbsp;&nbsp;# Swap the found minimum element with </div><div>&nbsp;&nbsp;&nbsp;&nbsp;# the first element&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div><div>&nbsp;&nbsp;&nbsp;&nbsp;A[i], A[min_idx] = A[min_idx], A[i] </div><div># Driver code to test above </div><div>print ("Sorted array") </div><div>for i in range(len(A)): </div><div>&nbsp;&nbsp;&nbsp;&nbsp;print("%d" %A[i]) </div>',
        "Insert":'<div># Python program for implementation of Insertion Sort </div><div># Function to do insertion sort </div><div>def insertionSort(arr): </div><div>&nbsp;&nbsp;&nbsp;&nbsp;# Traverse through 1 to len(arr) </div><div>&nbsp;&nbsp;&nbsp;&nbsp;for i in range(1, len(arr)): </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;key = arr[i] </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Move elements of arr[0..i-1], that are </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# greater than key, to one position ahead </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# of their current position </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;j = i-1</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;while j >= 0 and key < arr[j] : </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[j + 1] = arr[j] </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;j -= 1</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[j + 1] = key </div><div># Driver code to test above </div><div>arr = [12, 11, 13, 5, 6] </div><div>insertionSort(arr) </div><div>for i in range(len(arr)): </div><div>&nbsp;&nbsp;&nbsp;&nbsp;print ("% d" % arr[i]) </div><div># This code is contributed by Mohit Kumra </div>',
        "Quick":'<div># Python program for implementation of Quicksort Sort </div><div>def partition(arr,low,high): </div><div>&nbsp;&nbsp;&nbsp;&nbsp;i = ( low-1 )&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; # index of smaller element </div><div>&nbsp;&nbsp;&nbsp;&nbsp;pivot = arr[high]&nbsp;&nbsp;&nbsp;&nbsp; # pivot </div><div>&nbsp;&nbsp;&nbsp;&nbsp;for j in range(low , high): </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# If current element is smaller than the pivot </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if arr[j] < pivot: </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# increment index of smaller element </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i = i+1</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[i],arr[j] = arr[j],arr[i] </div><div>&nbsp;&nbsp;&nbsp;&nbsp;arr[i+1],arr[high] = arr[high],arr[i+1] </div><div>&nbsp;&nbsp;&nbsp;&nbsp;return ( i+1 ) </div><div># Function to do Quick sort </div><div>def quickSort(arr,low,high): </div><div>&nbsp;&nbsp;&nbsp;&nbsp;if low < high: </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# pi is partitioning index, arr[p] is now </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# at right place </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pi = partition(arr,low,high) </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Separately sort elements before </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# partition and after partition </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;quickSort(arr, low, pi-1) </div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;quickSort(arr, pi+1, high) </div><div># Driver code to test above </div><div>arr = [10, 7, 8, 9, 1, 5] </div><div>n = len(arr) </div><div>quickSort(arr,0,n-1) </div><div>print ("Sorted array is:") </div><div>for i in range(n): </div><div>&nbsp;&nbsp;&nbsp;&nbsp;print ("%d" %arr[i]) </div><div># This code is contributed by Mohit Kumra </div>'
    }

    $("#c").on("click",function(){
        lang = "c";
        $("#c").addClass("shadow");
        $("#cpp").removeClass("shadow");
        $("#java").removeClass("shadow");
        $("#py").removeClass("shadow");
        placeCode()
    });

    $("#cpp").on("click",function(){
        lang = "cpp";
        $("#cpp").addClass("shadow");
        $("#c").removeClass("shadow");
        $("#java").removeClass("shadow");
        $("#py").removeClass("shadow");
        placeCode()
    });

    $("#java").on("click",function(){
        lang = "java";
        $("#java").addClass("shadow");
        $("#cpp").removeClass("shadow");
        $("#c").removeClass("shadow");
        $("#py").removeClass("shadow");
        placeCode()
    });

    $("#py").on("click",function(){
        lang = "py";
        $("#py").addClass("shadow");
        $("#cpp").removeClass("shadow");
        $("#java").removeClass("shadow");
        $("#c").removeClass("shadow");
        placeCode()
    });

    $("#bubble").on("click",function(){
        algo = "b";
        $("#bubble").addClass("shadow");
        $("#select").removeClass("shadow");
        $("#quick").removeClass("shadow");
        $("#insert").removeClass("shadow");
        placeCode()
    });

    $("#select").on("click",function(){
        algo = "s";
        $("#select").addClass("shadow");
        $("#bubble").removeClass("shadow");
        $("#quick").removeClass("shadow");
        $("#insert").removeClass("shadow");
        placeCode()
    });

    $("#quick").on("click",function(){
        algo = "q";
        $("#quick").addClass("shadow");
        $("#select").removeClass("shadow");
        $("#bubble").removeClass("shadow");
        $("#insert").removeClass("shadow");
        placeCode()
    });

    $("#insert").on("click",function(){
        algo = "i";
        $("#insert").addClass("shadow");
        $("#select").removeClass("shadow");
        $("#quick").removeClass("shadow");
        $("#bubble").removeClass("shadow");
        placeCode()
    });

    function placeCode(){
        // C Language
        if(lang=="c" && algo=="b"){
            $("#fetch-code").html(cCode["Bubble"])
        }
    
        if(lang=="c" && algo=="s"){
            $("#fetch-code").html(cCode["Select"])
        }
    
        if(lang=="c" && algo=="i"){
            $("#fetch-code").html(cCode["Insert"])
        }
    
        if(lang=="c" && algo=="q"){
            $("#fetch-code").html(cCode["Quick"])
        }

        //C++ Language
        if(lang=="cpp" && algo=="b"){
            $("#fetch-code").html(cppCode["Bubble"])
        }
    
        if(lang=="cpp" && algo=="s"){
            $("#fetch-code").html(cppCode["Select"])
        }
    
        if(lang=="cpp" && algo=="i"){
            $("#fetch-code").html(cppCode["Insert"])
        }
    
        if(lang=="cpp" && algo=="q"){
            $("#fetch-code").html(cppCode["Quick"])
        }

        //Java Language
        if(lang=="java" && algo=="b"){
            $("#fetch-code").html(javaCode["Bubble"])
        }

        if(lang=="java" && algo=="s"){
            $("#fetch-code").html(javaCode["Select"])
        }

        if(lang=="java" && algo=="i"){
            $("#fetch-code").html(javaCode["Insert"])
        }

        if(lang=="java" && algo=="q"){
            $("#fetch-code").html(javaCode["Quick"])
        }

        //Python Language
        if(lang=="py" && algo=="b"){
            $("#fetch-code").html(pyCode["Bubble"])
        }                    
        if(lang=="py" && algo=="s"){
            $("#fetch-code").html(pyCode["Select"])
        }           
        if(lang=="py" && algo=="i"){
            $("#fetch-code").html(pyCode["Insert"])
        }            
        if(lang=="py" && algo=="q"){
            $("#fetch-code").html(pyCode["Quick"])
        }
    }

    placeCode()


});