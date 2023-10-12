/* 
    TODO: Target Sum Subsets
    ? https://practice.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1
 */

class Solution {
    static void pre(int sum, String ds, int n, int arr[]) {
        if(sum == 0 && n == 0) {
            System.out.println(ds);
            return;
        } else if(sum < 0 || n == 0) return;
        pre(sum - arr[n-1], ds + arr[n-1] + ", ", n-1, arr);
        pre(sum, ds, n-1, arr);
    }
    static Boolean isSubsetSum(int n, int arr[], int sum) {
        pre(sum,"",n,arr);
        return true;
    }
}