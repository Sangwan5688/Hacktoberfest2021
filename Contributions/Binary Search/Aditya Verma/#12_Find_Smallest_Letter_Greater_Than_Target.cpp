/*
    TODO: Find Smallest Letter Greater Than Target
    ? https://leetcode.com/problems/find-smallest-letter-greater-than-target/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    char nextGreatestLetter(vector<char>& letters, char target) {
        int low = 0, high = letters.size()-1, flag = false;
        while(low <= high) {
            int mid = low + ((high - low)>>1);
            if(letters[mid] <= target) {
                low = mid+1;
            } else high = mid-1;
        }
        if(low < letters.size()) return letters[low];
        else return letters.front();
    }
};