/*
    TODO: Maximum of minimum for every window size
    ? https://practice.geeksforgeeks.org/problems/maximum-of-minimum-for-every-window-size3453/1

    ! https://www.youtube.com/watch?v=CK8PIAF-m2E&ab_channel=GeeksforGeeksPractice
    ! tutorial
    
*/

#include "bits/stdc++.h"
using namespace std;

class Solution
{
    public:
    int maxi(int arr[],int n,int k){
        map<int,int> window;
        for(int i=0;i<k;i++) window[arr[i]]++;
        
        int ans = window.begin()->first;
        for(int i=k;i<n;i++){
            window[arr[i]]++;
            window[arr[i-k]]--;
            if(window[arr[i-k]] == 0) window.erase(arr[i-k]);
            
            ans = max(ans,window.begin()->first);
        }
        return ans;
    }
    vector <int> maxOfMin(int arr[], int n){
        vector<int> res;
        
        for(int i=0;i<n;i++){
            res.push_back(maxi(arr,n,i+1));
        }
        
        return res;
    }
};