/*
    TODO: Count Number of Nice Subarrays
    ? https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/
    ! if # of substring (concept) -> cnt += (n - i)
*/

class Solution {
public:
    int numberOfSubstrings(string s) {
        map<char,int> target, mp;
        for(char ch = 'a';ch <= 'z';ch++) target[ch] = 1;
        int cnt = 0, have = 0, need = 3, prev = 0, n = s.size();
        for(int i=0;i<s.size();i++) {
            mp[s[i]]++;
            if(target.find(s[i]) != target.end() and mp[s[i]] == target[s[i]]) have++;

            if(have < need) continue;
            while(have == need and prev <= i) {
                mp[s[prev]]--;
                if(target.find(s[prev]) != target.end() 
                    and mp[s[prev]] < target[s[prev]]) have--;
                prev++;
                cnt += (n - i);
                // if(have == need) cnt+= (n - i);
            }
            // if(have == need) cnt+= (n - i);
        }
        return cnt;
    }
};
//! Java