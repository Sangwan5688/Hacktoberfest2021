/*
    TODO: Floyd Warshall
    ? https://practice.geeksforgeeks.org/problems/implementing-floyd-warshall2042/1
*/
 
#include "bits/stdc++.h"
using namespace std;

class Solution {
  public:
	void shortest_distance(vector<vector<int>>&matrix){
	    int n = matrix.size();
	    for(auto &arr : matrix){
	        for(auto &i : arr){
	            if(i == -1) i = 1e9;
	        }
	    }
	    
	    // square matrix b/c of adjacent matrix instead of adjacent list
	    for(int k=0;k<n;k++){
	        for(int i=0;i<n;i++){
    	        for(int j=0;j<n;j++){
    	            matrix[i][j] = min(matrix[i][j], matrix[i][k] + matrix[k][j]);
    	        }
    	    }
	    }
	    
	    for(auto &arr : matrix){
	        for(auto &i : arr){
	            if(i == 1e9) i = -1; 
	            else if( i < 0) cout<<"Negative Cycle"<<endl;
	        }
	    }
	}
};