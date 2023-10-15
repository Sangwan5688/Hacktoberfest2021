/* 
    TODO: Print Elements of Array
    ? https://practice.geeksforgeeks.org/problems/print-elements-of-array4910/1
 */

class Solution {
    void pre(int arr[], int n) {
        if(n == 0) return;
        pre(arr,n-1);
        System.out.print(arr[n-1]+ " ");
    }
    void printArray(int arr[], int n) {
        pre(arr,n);
    }
}