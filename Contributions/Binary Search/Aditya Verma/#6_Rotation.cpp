/*
    TODO: Rotation
    ? https://practice.geeksforgeeks.org/problems/rotation4723/1
*/

#include "bits/stdc++.h"
using namespace std;

class Solution{
public:	
	int findKRotation(int arr[], int n) {
	    int low = 0, high = n-1;
	    while(low <= high) {
	        int mid = low + ((high - low) >> 1);
	        if(arr[mid-1] > arr[mid] and arr[mid] < arr[mid+1]) return mid;  
	        else if(arr[mid] > arr[high]) low = mid+1;
	        else high = mid-1;
	    }
	    return low;
	}
};