/*
    TODO: Trapping Rain Water
    ? https://leetcode.com/problems/trapping-rain-water/
*/

// ? 2 pointer

class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size(),ans = 0;
        int l = 0, h = n-1,lmax = 0,rmax = 0;
        
        while(l<h){
            if(height[l] <= height[h]){
                if(height[l] >= lmax) lmax = height[l];
                else ans += (lmax - height[l]);
                l++;
            }
            else{
                if(height[h] >= rmax) rmax = height[h];
                else ans += (rmax - height[h]);
                h--;
            }
        }

        return ans;
    }
};

// ? Brute prefix ( temp = min(lmax[i],rmax[i]) - height[i] )

class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size();
        vector<int> lmax(n),rmax(n);
        int maxi = 0,ans = 0;
        for(int i=0;i<n;i++) lmax[i] = max(maxi,height[i]),maxi = max(maxi,height[i]);
        maxi = 0;
        for(int i=n-1;i>=0;i--) rmax[i] = max(maxi,height[i]),maxi = max(maxi,height[i]);
        for(int i=0;i<n;i++){
            int temp = min(lmax[i],rmax[i]) - height[i];
            if(temp >= 0) ans += temp;
        }
        return ans;
    }
};