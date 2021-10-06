#include <bits/stdc++.h>
using namespace std;

void cSort(char s[]) {
    string output;

    int count[256], i;
    for (int i = 0; i < 256; i++){
         count[i] = 0;
    }
    for (i = 0; s[i]; ++i){
         ++count[s[i]];
    }
    for (i = 1; i < 256; ++i){
         count[i] += count[i - 1];
    }
    for (i = 0; s[i]; ++i) {
        output[count[s[i]] - 1] = s[i];
        --count[s[i]];
    }

    for (i = 0; s[i]; ++i){
         s[i] = output[i];
    }
    cout << "Sorted string is: " << s;
}

int main() {
    int n;
    cin>>n;
    char s[n];
    cin>>s;
    
    cSort(s);
    return 0;
}