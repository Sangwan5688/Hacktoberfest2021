/*
    TODO: Longest Repeating Character Replacement
    ? https://leetcode.com/problems/longest-repeating-character-replacement/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    int characterReplacement(string s, int k) {
        map<char,int> mp;
        int ans =0,prev = 0;
        for(int i=0;i<s.size();i++){
            mp[s[i]]++;
            
            int sum =0,maxi = 0,f = 0;
            char ch ='-';
            vector<int> temp;
            for(auto j : mp){
                temp.push_back(j.second);
                // maxi = max(maxi,j.second);  
                if(maxi < j.second){
                    maxi = j.second;
                    ch = j.first;
                }
                // cout<<j.first<<" ";
            } 
            // cout<<endl;
            for(auto j : temp){
                if(f == 0 and j == maxi) f= 1;
                else sum += j;
            }
            
            if(sum <= k) ans = max(ans,(i - prev + 1));
            // cout<<i<<" << "<<sum<<" : "<<ans<<" : "<<ch<<endl;

            while(sum > k and prev < i){
                mp[s[prev]]--;
                if(mp[s[prev]] == 0) mp.erase(s[prev]);
                sum--;
                prev++;
            }
        }
        return ans;
    }
};