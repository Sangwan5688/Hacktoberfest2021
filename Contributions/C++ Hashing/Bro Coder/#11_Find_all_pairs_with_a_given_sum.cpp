/* 
    TODO: Find all pairs with a given sum
    ? https://practice.geeksforgeeks.org/problems/find-all-pairs-whose-sum-is-x5808/1
 */

#include "bits/stdc++.h"
using namespace std;

class Solution{
    public:
    vector<pair<int,int>> allPairs(int arr1[], int arr2[], int n, int m, int target){
        map<int,int> m2;
        for(int i=0;i<m;i++) m2[arr2[i]]++;
        
        vector<pair<int,int>> pr;
        for(int i=0;i<n;i++) {
            if(m2.find(target - arr1[i]) != m2.end()) { 
                pr.push_back({arr1[i], target - arr1[i]});
                m2.erase(target-arr1[i]);
            }
        }
        sort(pr.begin(),pr.end());
        return pr;
    }
};