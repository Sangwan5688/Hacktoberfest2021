/* 
    TODO: Array Subset of another array
    ? https://practice.geeksforgeeks.org/problems/array-subset-of-another-array2317/1
 */

#include "bits/stdc++.h"
using namespace std;

string isSubset(int a1[], int a2[], int n, int m) {
    map<int,int> m1, m2;
    for(int i=0;i<n;i++) m1[a1[i]]++;
    for(int i=0;i<m;i++) m2[a2[i]]++;
    
    for(auto i : m2) {
        if(m1.find(i.first) != m1.end() and m1[i.first] >= i.second) {
            
        } else return "No";
    }
    
    return "Yes";
}