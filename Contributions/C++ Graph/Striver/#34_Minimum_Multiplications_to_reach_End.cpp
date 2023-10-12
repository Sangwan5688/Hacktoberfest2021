/*
    TODO: Minimum Multiplications to reach End
    ? https://practice.geeksforgeeks.org/problems/minimum-multiplications-to-reach-end/1
*/
 
#include "bits/stdc++.h"
using namespace std;

class Solution {
  public:
    int minimumMultiplications(vector<int>& arr, int start, int end) {
        // 0 ------> 9999
        vector<int> dist(100000,1e9); // node will start from 0 to 1e5-1
        queue<pair<int,int>> q;
        // set<pair<int,int>> q;
        // ,vector<pair<int,int>>,greater<pair<int,int>>
        q.push({start,0});
        dist[start] = 0;
        
        while(!q.empty()){
            int u = q.front().first;
            int step = q.front().second;
            q.pop();
            
            for(auto i : arr){
                int v = (i*u)%100000;
                if(step + 1 < dist[v]){
                    dist[v] = step + 1;
                    if(v == end) return step + 1;
                    q.push({v,step+1});
                }
            }
        }
        
        return -1;
    }
};