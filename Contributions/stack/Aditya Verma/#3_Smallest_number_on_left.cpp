/*
    TODO: Smallest number on left
    ? https://practice.geeksforgeeks.org/problems/smallest-number-on-left3403/1
*/

#include "bits/stdc++.h"
using namespace std;

class Solution{
public:
    vector<int> leftSmaller(int n, int arr[]){
        vector<int> ans(n,0);
        stack<int> st;
        for(int i=0;i<n;i++){
            while(!st.empty() and arr[i] <= st.top()) st.pop();
            if(st.size() == 0) ans[i] = -1;
            else ans[i] = st.top();
            st.push(arr[i]);
        }
        return ans;
    }
};