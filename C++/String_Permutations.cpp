// #include <bits/stdc++.h>
// using namespace std;
// vector<string> permutation(string s,int i=0)
//     {
//    static vector<string> N;
//     static vector<string> M;
//     if (i == s.length() - 1)
//     {
//         N.push_back(s);
//         return N;
//     }
//     for (int j = i; j < s.length(); j++)
//     {
//         swap(s[i], s[j]);
//         M=permutation(s,i+1);
//         swap(s[i], s[j]);
//     }
//     sort(M.begin(),M.end());
//     if(i==0)
//     N.clear();
//     return M;
//     }
// int main()
// {
//     #ifndef ONLINE_JUDGE
//         freopen("input.txt", "r", stdin);
//         freopen("output.txt", "w", stdout);
//     #endif
//     string s;
//     cin >> s;
//     vector<string>O;
//     O=permutation(s, 0);
//     for(int i=0;i<O.size();i++)
//     {
//         cout<<O[i]<<" ";
//     }
//     return 0;
// }

// { Driver Code Starts
#include <bits/stdc++.h>
using namespace std;

// } Driver Code Ends
class Solution
{
public:
    //Complete this function

    vector<string> permutation(string s, int i = 0)
    {
        static vector<string> N;
        static vector<string> M;
        if (i == 0)
         N.clear();
        if (i == s.length() - 1)
        {
            N.push_back(s);
            return N;
        }
        for (int j = i; j < s.length(); j++)
        {
            swap(s[i], s[j]);
            M = permutation(s, i + 1);
            swap(s[i], s[j]);
        }
        sort(M.begin(), M.end());

        return M;
    }
};

// { Driver Code Starts.

int main()
{
#ifndef ONLINE_JUDGE
    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);
#endif
    int T;
    cin >> T;
    while (T--)
    {
        string S;
        cin >> S;
        Solution ob;
        vector<string> vec = ob.permutation(S);
        for (string s : vec)
        {
            cout << s << " ";
        }
        cout << endl;
    }
    return 0;
} // } Driver Code Ends