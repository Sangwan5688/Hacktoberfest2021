/*
    TODO: Fruit Into Baskets
    ? https://leetcode.com/problems/fruit-into-baskets/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    int totalFruit(vector<int>& fruits) {
        int ans = 0,prev = 0,k = 2;
        map<int,int> mp;
        for(int i=0;i<fruits.size();i++){
            mp[fruits[i]]++;
            if(mp.size() <= k){
                int curr = 0;
                for(auto j : mp) curr += j.second;
                ans = max(ans,curr);
            }
            while(mp.size() > k){
                mp[fruits[prev]]--;
                if(mp[fruits[prev]] == 0) mp.erase(fruits[prev]);
                prev++;
            }
        }
        return ans;
    }
};