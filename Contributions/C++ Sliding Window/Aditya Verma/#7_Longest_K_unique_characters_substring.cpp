/*
    TODO: Longest K unique characters substring
    ? https://practice.geeksforgeeks.org/problems/longest-k-unique-characters-substring0853/1
*/

#include "bits/stdc++.h"
using namespace std;

class Solution{
  public:
    int longestKSubstr(string s, int k) {
        int sumi =0,ans = -1,prev = 0;
        map<char,int> mp;
        for(int i=0;i<s.size();i++){
            mp[s[i]]++;
            if(mp.size() < k){}
            else if(mp.size() == k){
                ans = max(ans,(i - prev + 1));
            }
            while(mp.size() > k){
                mp[s[prev]]--;
                if(mp[s[prev]] == 0) mp.erase(s[prev]);
                prev++;
            }
        }
        return ans;
    }
};