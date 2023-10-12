/*
    TODO: Minimum Platforms
    ? https://practice.geeksforgeeks.org/problems/minimum-platforms-1587115620/1
*/
#include "bits/stdc++.h"
using namespace std;

class Solution{
    public:
    int findPlatform(int arr[], int dep[], int n){
    	int maxi = 1;
    	sort(arr,arr+n);
    	sort(dep,dep+n);
    	int i = 1,j = 0,palt = 1;
    	while(i < n and j < n){
            if(arr[i] <= dep[j]){
                palt++;
                maxi = max(maxi,palt);
                i++;
            }else{
                j++;i++;
            }
    	}
    	return maxi;
    }
};
