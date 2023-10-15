/* 
    TODO: Largest Element in Array
    ? https://practice.geeksforgeeks.org/problems/largest-element-in-array4009/0
 */

class Compute {
    public int largest(int arr[], int n) {
        if(n == 0) return 0;
        int left = largest(arr,n-1);
        return Math.max(left,arr[n-1]);
    }
}
