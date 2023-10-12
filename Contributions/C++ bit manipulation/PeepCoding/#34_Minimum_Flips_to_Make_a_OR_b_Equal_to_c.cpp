/*
    TODO: Minimum Flips to Make a OR b Equal to c
    ? https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/description/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    int minFlips(int a, int b, int c) {
        int ans = 0,i = 0;
        while(true){
            if(i == 32) break;
            if((c&1) and !(a&1) and !(b&1)) ans ++;
            if(!(c&1)){ if(a&1) ans++; if(b&1) ans++;}
            a >>= 1,b >>= 1, c >>= 1,i++;
        }
        return ans;
    }
};