/*
    TODO: Bitonic Point
    ? https://practice.geeksforgeeks.org/problems/maximum-value-in-a-bitonic-array3001/1
	? https://leetcode.com/problems/peak-index-in-a-mountain-array/description/
*/


#include "bits/stdc++.h"
using namespace std;

class Solution{
public:
	int findMaximum(int arr[], int n) {
	    int low = 0, high = n-1;
	    while(low <= high) {
	        int mid = low + ((high - low)>>1);
	        int prev = arr[(mid-1+n)%n], next = arr[(mid+1)%n];
	        if(prev < arr[mid] and arr[mid] > next) return arr[mid];
	        else if(arr[mid] > next) high = mid-1;
	        else low = mid+1;
	    }
	    return arr[low];
	}
};