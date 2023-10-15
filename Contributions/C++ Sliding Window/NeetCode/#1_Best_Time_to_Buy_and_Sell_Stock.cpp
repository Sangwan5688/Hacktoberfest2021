/*
    TODO: Best Time to Buy and Sell Stock
    ? https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int left = 0, right = 1, maxi = 0;
        while(right < prices.size()) {
            if(prices[left] > prices[right]) left = right,right++;
            else {
                // cout<<prices[left] <<" "<<prices[right]<<endl;
                maxi = max(maxi,prices[right] - prices[left]);
                right++;
            }
        }
        return maxi;
    }
};

//! Java
class Solution {
    public int maxProfit(int[] prices) {
        int left = 0, right = 1, maxi = 0;
        while(right < prices.length) {
            if(prices[left] > prices[right]) {
                left = right;
                right++;
            } else {
                // cout<<prices[left] <<" "<<prices[right]<<endl;
                maxi = Math.max(maxi,prices[right] - prices[left]);
                right++;
            }
        }
        return maxi;
    }
}