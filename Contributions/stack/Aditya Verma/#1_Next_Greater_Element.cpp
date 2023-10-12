/*
    TODO: Next Greater Element
    ? https://practice.geeksforgeeks.org/problems/next-larger-element-1587115620/1
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
    public:
    typedef long long ll;
    vector<ll> nextLargerElement(vector<ll> arr, int n){
        vector<ll> ans(n,0);
        stack<ll> st;
        for(int i=n-1;i>=0;i--) {
            while(!st.empty() and arr[i] >= st.top()) st.pop();
            if(st.size() == 0) ans[i] = -1;
            else ans[i] = st.top();
            st.push(arr[i]);
        }
        return ans;
    }
};