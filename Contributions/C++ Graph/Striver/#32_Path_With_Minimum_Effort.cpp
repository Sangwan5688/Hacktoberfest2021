/*
    TODO: Path With Minimum Effort
    ? https://practice.geeksforgeeks.org/problems/path-with-minimum-effort/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=path-with-minimum-effort
*/
 
#include "bits/stdc++.h"
using namespace std;

class Compare {
    public: 
    bool operator()(vector<int> &arr1, vector<int> &arr2) {
        return arr1[0] > arr2[0];
    }
};

class Solution {
  public:
    bool isValid(int i, int j, int n, int m) {
        return ((i>=0) and (i < n) and (j >= 0) and (j < m));
    }
    int MinimumEffort(vector<vector<int>>& heights) {
        int n = heights.size(), m = heights[0].size(), res = 1e9;
        vector<vector<int>> dist(n, vector<int> (m,1e9));
        dist[0][0] = 0;
        priority_queue<vector<int>, vector<vector<int>>, Compare> pq;
        pq.push({0,-1,0,0});
        // maxi pervious x, y
        
        while(!pq.empty()){
            int diff = pq.top()[1], maxi = pq.top()[0];
            int x = pq.top()[2], y = pq.top()[3];
            
            pq.pop();
            if(!isValid(x,y,n,m)) continue;
            
            
            if(diff == -1){
                pq.push({0,heights[x][y],x+1,y});
                pq.push({0,heights[x][y],x-1,y});
                pq.push({0,heights[x][y],x,y+1});
                pq.push({0,heights[x][y],x,y-1});
            }else{
                int heightDiff = abs(heights[x][y] - diff);
                maxi = max(maxi,heightDiff);
                if(x == n-1 and y == m-1){
                    res = min(res,maxi);
                }
                
                if(heightDiff < dist[x][y]){
                    dist[x][y] = heightDiff;
                    pq.push({maxi,heights[x][y],x+1,y});
                    pq.push({maxi,heights[x][y],x-1,y});
                    pq.push({maxi,heights[x][y],x,y+1});
                    pq.push({maxi,heights[x][y],x,y-1});
                }
            }
        }
        return res == 1e9 ? 0 : res;
    }
};

//! striver
class Solution {
public:
    bool isValid(int i, int j, int n, int m) { return ((i >= 0) and (j >= 0) and (i < n) and (j < m)); }
    int minimumEffortPath(vector<vector<int>>& heights) {
        int n = heights.size(), m = heights[0].size();
        priority_queue<pair<int,pair<int,int>>, vector<pair<int,pair<int,int>>>, greater<pair<int,pair<int,int>>>> pq;
        vector<vector<int>> dist(n, vector<int> (m,1e9));
        // diff x y
        pq.push({0,{0,0}});
        dist[0][0] = 0;

        while(!pq.empty()){
            int diff = pq.top().first;
            int x = pq.top().second.first, y = pq.top().second.second;
            pq.pop();

            if(x == n-1 and y == m-1) return diff;

            if(!isValid(x,y,n,m)) continue;
            vector<int> ax = {1,-1,0,0}, ay = {0,0,-1,1};
            for(int i=0;i<4;i++){
                int xx = ax[i] + x, yy = ay[i] + y;
                if(isValid(xx,yy,n,m)){
                    int newEffort = max(diff, abs(heights[x][y] - heights[xx][yy]));
                    if(newEffort < dist[xx][yy]){
                        dist[xx][yy] = newEffort;
                        pq.push({newEffort,{xx,yy}});
                    }
                }
            }

        }
        return 0;
    }
};