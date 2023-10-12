/*
    TODO: City With the Smallest Number of Neighbors at a Threshold Distance
    ? https://practice.geeksforgeeks.org/problems/city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=city-with-the-smallest-number-of-neighbors-at-a-threshold-distance
*/
 
#include "bits/stdc++.h"
using namespace std;

class Solution {
  public:
    int findCity(int n, int m, vector<vector<int>>& edges, int distanceThreshold) {
        vector<vector<int>> city(n, vector<int> (n,1e9));
        for(auto &arr : edges){
            int u = arr[0], v = arr[1], wt = arr[2];
            city[u][v] = wt;
            city[v][u] = wt;
        }
        
        for(int i=0;i<n;i++) city[i][i] = 0;    
        
        for(int k=0;k<n;k++){
            for(int i=0;i<n;i++){
                for(int j=0;j<n;j++){
                    city[i][j] = min(city[i][j], city[i][k] + city[k][j]);
                }
            }
        }
        
        map<int,vector<int>> mp;
        for(int i=0;i<n;i++){
            int cnt = 0;
            for(int j=0;j<n;j++)
                if(city[i][j] <= distanceThreshold)
                    cnt++;
            
            mp[cnt].push_back(i);
        }
        
        // for(int i=0;i<n;i++){
        //     for(int j=0;j<n;j++){
        //         cout<<city[i][j]<<" ";
        //     }
        //     cout<<endl;
        // }
        
        // for(auto i : mp){
        //     cout<<i.first<<" :: ";
        //     for(auto j : i.second) cout<<j<<" ";
        //     cout<<endl;
        // }
        
        return mp.begin()->second.back();
    }
};
