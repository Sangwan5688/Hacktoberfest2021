/*
    TODO: Gray Code
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/gray-code/ojquestion
*/
#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    vector<int> grayCode(int n) {
        vector<vector<int>> ans = {{0}, {1}};
        vector<int> ds;
        for (int i = 1; i < n; i++) {

            vector<vector<int>> temp;

            for (auto i : ans) {
                i.insert(i.begin(), 0);
                temp.push_back(i);
            }

            reverse(ans.begin(), ans.end());


            for (auto i : ans) {
                i.insert(i.begin(), 1);
                temp.push_back(i);
            }

            ans = temp;

        }


        for (auto i : ans) {
            int no = 0;
            for (auto j : i) {
                no = no * 2 + j;
            }
            ds.push_back(no);
        }
        return ds;
    }
};