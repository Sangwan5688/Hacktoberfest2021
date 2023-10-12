/*
    TODO: Number of occurrence
    ? https://practice.geeksforgeeks.org/problems/number-of-occurrence2259/1
*/

#include "bits/stdc++.h"
using namespace std;

class Solution{
public:	
	int count(int arr[], int n, int target) {
	    int low = 0, high = n-1;
	    vector<int> ans = {-1,-1};
	    while(low <= high) {
	        int mid = low + ((high - low) >> 1);
	        if(arr[mid] <= target) {
	            if(arr[mid] == target) ans[1] = mid;
	            low = mid+1;
	        } else {
	            high = mid-1;
	        }
	    }
	    
	    low = 0, high = n-1;
	    while(low <= high) {
	        int mid = low + ((high - low) >> 1);
	        if(arr[mid] >= target) {
	            if(arr[mid] == target) ans[0] = mid;
	            high = mid-1;
	        } else {
	            low = mid+1;
	        }
	    }
	    
	    if(ans[0] == -1 and ans[1] == -1) return 0;
	    else if(ans[0] == -1) return 1;
	    else if(ans[1] == -1) return 1;
	    return ans[1] - ans[0] + 1;
	}
};
