/* 
    TODO: Search in Rotated Sorted Array
    ? https://leetcode.com/problems/search-in-rotated-sorted-array/
 */

class Solution {
public:
    int search(vector<int>& arr, int target) {
        int n = arr.size(), low = 0, high = n-1, index = 0;
        while(low <= high) {
            int mid = low + ((high - low)>>1);
            int prev = arr[(n+mid-1)%n];
            int next = arr[(mid+1)%n];
            if(prev > arr[mid] and arr[mid] < next) {
                index = mid;
                break;
            } else if(arr[mid] > arr[high]) low = mid+1;
            else high = mid-1;
        }
        low = 0, high = 0;

        if(arr[index] <= target and target <= arr.back()) low = index, high = n-1;
        else low = 0, high = index;

        int ans = 0;

        while(low <= high) {
            int mid = low + ((high - low)>>1);
            if(arr[mid] == target) return mid;
            else if(arr[mid] < target) low = mid+1;
            else high = mid-1;
        }
        return -1;
    }
};