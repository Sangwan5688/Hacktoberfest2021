/*
    TODO: Get minimum element from stack without extra space
    ? https://leetcode.com/problems/min-stack/
*/

#include "bits/stdc++.h"
using namespace std;

class MinStack {
private:
    long mn;
    stack<long> s;
public:
    MinStack() { }
    void push(int val) {
        if(s.empty()) {
            mn=val;
            s.push(val);
        }
        else if(val>=mn)
            s.push(val);
        else {
            s.push((long)2*val-mn);
            mn=val;
        }  
    }
    void pop() {
        if(s.top()<mn) mn=2*mn-s.top();
        s.pop();
    }
    int top() {
        if(s.empty()) return -1;
        if(s.top()>=mn) return s.top();
        else return mn;
    }
    int getMin() {
        return mn;
    }
};