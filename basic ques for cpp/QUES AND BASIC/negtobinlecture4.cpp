//negative number to binary

#include <bits/stdc++.h>
using namespace std;
int main()
{
    int m;
    cin >> m;
    unsigned int n = abs(m);
    int ans = 0;
    int i = 0;
    while (n != 0)
    {
        int bit = n & 1;
        ans = bit * pow(10, i) + ans;
        n = n >> 1;
        i++;
    }
    int complement = ~ans + 1;
    //cout<<complement<<endl;
    float complement_1 = ~complement + 1;
    cout << complement_1;
}