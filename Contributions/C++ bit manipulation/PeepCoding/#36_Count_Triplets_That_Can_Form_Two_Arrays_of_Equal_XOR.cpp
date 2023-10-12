/*
    TODO: Count Triplets That Can Form Two Arrays of Equal XOR
    ? https://leetcode.com/problems/count-triplets-that-can-form-two-arrays-of-equal-xor/description/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    int countTriplets(vector<int>& arr) {
        int n = arr.size(), x = 0, cnt = 0;
        map<int,vector<int>> mp;
        mp[0].push_back(-1);
        for(int i=0;i<n;i++){
            x = x ^ arr[i];
            if(mp.find(x) != mp.end()){
                cout<<x<<" :: ";
                for(auto j : mp[x]){
                    cout<<j<<" ";
                    cnt = cnt + (i - j - 1);
                }
                cout<<endl;
            }
            mp[x].push_back(i);
        }
        return cnt;
    }
};