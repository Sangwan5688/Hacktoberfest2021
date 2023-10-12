/*
    TODO: Count Occurences of Anagrams
    ? https://practice.geeksforgeeks.org/problems/count-occurences-of-anagrams5839/1
*/

#include "bits/stdc++.h"
using namespace std;

class Solution{
public:
	int search(string pat, string txt) {
	    int k = pat.size(), res = 0;
	    map<char,int> window,desire;
	    for(auto i : pat) desire[i]++;
	    
	    for(int i=0;i<k;i++) window[txt[i]]++;
	    
	    if(window == desire) res++;
	    for(int i=k;i<txt.size();i++){
	        window[txt[i]]++;
	        window[txt[i-k]]--;
	        if(window[txt[i-k]] == 0) window.erase(txt[i-k]);
	        
	        if(window == desire) res++;
	    }
	    return res;
	}

};