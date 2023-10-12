/*
    TODO: Range Sum Query - Mutable
    ? https://leetcode.com/problems/range-sum-query-mutable/description/
*/

#include "bits/stdc++.h"
using namespace std;

class SGTree{
public:
    vector<int> seg;
    SGTree() {}
    SGTree(int n) {
        seg.resize(4*n+1,0);
    }

    void build(int low, int high, int ind, vector<int>& arr) {
        if(low == high) {
            seg[ind] = arr[low];
            return;
        }
        int mid = low + ((high - low)>>1);
        build(low,mid,2*ind+1,arr);
        build(mid+1,high,2*ind+2,arr);
        seg[ind] = seg[2*ind+1] + seg[2*ind+2];
    }

    int query(int low, int high, int ind, int left, int right, vector<int>& arr) {
        if(left == right) return arr[left];
        else if(left <= low and high <= right) return seg[ind];
        else if(max(low,left) <= min(right,high)) {
            int mid = low + ((high - low)>>1);
            int l = query(low,mid,2*ind+1,left,right,arr);
            int r = query(mid+1,high,2*ind+2,left,right,arr);
            return l + r;
        } else return 0;
    }

    void update(int low, int high, int ind, int index, int value, vector<int>& arr) {
        if(low == high and low == index) {
            seg[ind] = arr[low];
            return;
        }
        int mid = low + ((high - low)>>1);
        if(low <= index and index <= mid)
            update(low,mid,2*ind+1,index,value,arr);
        else if(mid+1 <= index and index <= high)
            update(mid+1,high,2*ind+2,index,value,arr);

        seg[ind] = (seg[2*ind+1] + seg[2*ind+2]);
    }

    ~SGTree() {};
};
class NumArray {
    vector<int> arr;
    SGTree *sg;
public:
    NumArray(vector<int>& nums) { 
        arr = nums; 
        sg = new SGTree(arr.size());
        sg->build(0,arr.size()-1,0,arr);
    }
    void update(int index, int val) {
        arr[index] = val;
        sg->update(0,arr.size()-1,0,index,val,arr);
    }
    
    int sumRange(int left, int right) {
        return sg->query(0,arr.size()-1,0,left,right,arr);
    }
};