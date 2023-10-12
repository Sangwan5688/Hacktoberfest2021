/*
    TODO: Search In Infinite Sorted 0-1 Array 
    ? https://www.codingninjas.com/codestudio/problems/search-in-infinite-sorted-0-1-array_696193?leftPanelTab=0
*/

#include "bits/stdc++.h"
using namespace std;

/*  
    * Use get function that returns the value at index i
    * in the infinite sorted binary array.
    * get(i) {}
*/

typedef long long ll;
ll firstOne() {
    ll low = 0, high = 1e18 +5;
    while(low <= high) {
        ll mid = low + ((high - low)>>1);
        ll val = get(mid);
        if(val >= 1) high = mid-1;
        else low = mid+1;
    }
    if(high >= 0) return high+1;
    else return -1;
}
