/* 
    TODO: K-th element of two sorted Arrays
    ? https://practice.geeksforgeeks.org/problems/k-th-element-of-two-sorted-array1317/1
    ! int low = max(0,k-m), high = min(n,k);
    ! video 22:05 edge test cases
 */

class Solution {
public:
    int kthElement(int arr1[], int arr2[], int n, int m, int k) {
        if(m < n) return kthElement(arr2,arr1,m,n,k);
        
        // int low = 0, high = n-1;
        int low = max(0,k-m), high = min(n,k); //! edge test case
        int len = n + m, median = -1;
        
        while(low <= high) {
            int cut1 = low + ((high - low)>>1);
            int cut2 = k - cut1;
            
            int l1 = cut1 == 0 ? INT_MIN : arr1[cut1-1]; //! edge test case
            int l2 = cut2 == 0 ? INT_MIN : arr2[cut2-1];
            
            int r1 = cut1 == n ? INT_MAX : arr1[cut1]; //! edge test case
            int r2 = cut2 == m ? INT_MAX : arr2[cut2];
            
            if(l1 <= r2 and l2 <= r1) {
                if(len&1) median = max(l1,l2);
                else median = max(l1,l2);
                break;
            } else if(l1 > r2) high = cut1 - 1;
            else low = cut1 + 1;
        }
        
        return median;
    }
};