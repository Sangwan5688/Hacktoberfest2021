/*
    TODO: Minimum Window Substring
    ? https://leetcode.com/problems/minimum-window-substring/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    string minWindow(string s, string t) {
        if(s.size() < t.size()) return "";
        int ans = 1e9,prev = 0,Start = -1,End = -1;

        map<char,int> des,mp;
        for(auto i : t) des[i]++;
        string res = "";

        int count = des.size();
        for(int i=0;i<s.size();i++){
            if(des.find(s[i]) != des.end()){
                des[s[i]]--;
                if(des[s[i]] == 0) count--;
            }
            while(count == 0){          
                if((i - prev + 1) < ans){
                    ans = i - prev + 1;
                    Start = prev;
                    End = i;
                }

                if(des.find(s[prev]) != des.end()){
                    des[s[prev]]++;
                    if(des[s[prev]] > 0){
                        prev++;
                        count++;
                    }else{
                        prev++;
                        if((i - prev + 1) < ans){
                            ans = i - prev + 1;
                            Start = prev;
                            End = i;
                        }
                    }
                }else{
                    prev++;
                    if((i - prev + 1) < ans){
                        ans = i - prev + 1;
                        Start = prev;
                        End = i;
                    }
                }
            }
            // cout<<temp<<endl;
        }
        
        if(Start == -1 and End == -1) return "";
        res = s.substr(Start,(End - Start + 1));
        return res;
    }
};


// ! comment ans

class Solution {
public:
    string minWindow(string s, string t) {
        int ans = 0,prev = 0;

        map<char,int> des,mp;
        for(auto i : t) des[i]++;

        int count = des.size();
        for(int i=0;i<s.size();i++){
            if(des.find(s[i]) != des.end()){
                des[s[i]]--;
                if(des[s[i]] == 0) count--;
            }
            if(count == 0){          
                ans = min(ans,(j - i + 1));

                if(des.find(s[prev]) != des.end()){
                    des[s[prev]]++;
                    if(des[s[prev]] > 0){
                        prev++;
                        count++;
                    }else{
                        prev++;
                        ans = min(ans,(j - i + 1));
                    }
                }else{
                    prev++;
                    ans = min(ans,(j - i + 1));
                }
            }
        }

        return ans;
    }
};