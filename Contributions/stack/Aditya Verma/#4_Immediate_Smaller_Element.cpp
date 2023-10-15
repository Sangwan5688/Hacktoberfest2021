/*
    TODO: Immediate Smaller Element
    ? https://practice.geeksforgeeks.org/problems/immediate-smaller-element1142/1
*/

#include "bits/stdc++.h"
using namespace std;

class Solution{
public:	
	void immediateSmaller(vector<int>&arr, int n) {
	    vector<int> ans(n,0);
	    stack<int> st;
	    for(int i=n-1;i>=0;i--) {
	        while(!st.empty() and arr[i] <= st.top()) st.pop();
	        if(st.size() == 0) ans[i] = -1;
	        else {
	            ans[i] = st.top();
    	        st.pop();
	        }
	        st.push(arr[i]);
	    }
	    arr = ans;
	}
};