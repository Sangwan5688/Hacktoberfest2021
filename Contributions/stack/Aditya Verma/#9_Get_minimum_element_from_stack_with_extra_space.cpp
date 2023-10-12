/*
    TODO: Get minimum element from stack with extra space
    ? https://practice.geeksforgeeks.org/problems/get-minimum-element-from-stack/1
*/

#include "bits/stdc++.h"
using namespace std;

class Solution{
    int minEle;
    stack<int> st,minSt;
    public:
       int getMin(){
        //   cout<<"min"<<endl;
           if(minSt.size() == 0) return -1;
           return minSt.top();
       }
       int pop(){
        //   cout<<"pop"<<endl;
            if(st.size() == 0) return -1;
           
           int no = st.top();
           st.pop();
           if(!minSt.empty() and minSt.top() == no) minSt.pop();
           return no;
       }
       void push(int x){
        //   cout<<"push"<<endl;
           if(st.size() == 0) {
               st.push(x);
               minSt.push(x);
           } else {
               st.push(x);
               if(minSt.top() >= x) minSt.push(x);
           }
       }
};