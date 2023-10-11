#include<bits/stdc++.h>
using namespace std;

// Kadane's Algorithm
// work for -ve ans as well

int kadane(int arr[], int n){
    int ans = arr[0];
    int count = arr[0];
    for(int i = 0; i < n; i++){
        count = max(arr[i], count+arr[i]);
        ans = max(ans, count);
    }
    return ans;
}

int main() {
    int a[] = {-2, -3, 4, -1, -2, 1, 5, -3}; 
    int n = sizeof(a)/sizeof(a[0]); 
    
    cout << kadane(a, n) << endl;

    return 0;
}