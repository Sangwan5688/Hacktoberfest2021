/*
    TODO: Longest Sub-Array with Sum K
    ? https://practice.geeksforgeeks.org/problems/longest-sub-array-with-sum-k0809/1

    ! approach exclude negative number
*/

#include "bits/stdc++.h"
using namespace std;

class Solution{
    public:
	int lenOfLongSubarr(int arr[],  int n, int k) {
		long long int sumi = 0;
		int maxi = 0, prev = 0;
		for (int i = 0; i < n; i++) {
			sumi += arr[i];
			if (sumi < k) continue;
			if (sumi == k)
				maxi = max(maxi, (i - prev + 1));
			while (sumi > k and prev < n) {
				sumi -= arr[prev];
				prev++;
			}
		}
		return maxi;
	}
};