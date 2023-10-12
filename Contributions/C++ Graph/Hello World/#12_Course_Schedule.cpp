/*
    TODO: Course Schedule
    ? https://leetcode.com/problems/course-schedule/
*/

#include "bits/stdc++.h"
using namespace std;

//? DFS
class Solution {
public:
   
    bool dfs(int s, vector<bool>& visit, vector<bool>& dfsvisit, vector<int> adj[]){
        visit[s] = true;
        dfsvisit[s] = true;

        for(auto n : adj[s]){
            if(visit[n] == false){
                if(dfs(n,visit,dfsvisit,adj)) return true;
            }else if(visit[n] and dfsvisit[n]) return true;
        }

        dfsvisit[s] = false;
        return false;
    }

    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        int n = numCourses;
        vector<int> adj[n];
        for(auto i : prerequisites){
            adj[i[0]].push_back(i[1]);
        }

        // for(int i=0;i<numCourses;i++){
        //     cout<<i <<" :: ";
        //     for(auto j : adj[i]){
        //         cout<<j<<" ";
        //     }
        //     cout<<endl;
        // }


        vector<bool> visit(n+1,false), dfsvisit(n+1,false);
        bool flag = false;
        for(int i=0;i<n;i++){
            if(visit[i] == false){
                if(dfs(i,visit,dfsvisit,adj)) flag = true;
            }
        }

        return !flag;
        return false;
    }
};