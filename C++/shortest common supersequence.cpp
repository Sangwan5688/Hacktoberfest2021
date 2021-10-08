#include<iostream>
#include<string>
#include<algorithm>
using namespace std;

class Solution {
public:
    string shortestCommonSupersequence(string text1, string text2) {
        int n = text1.length();
        int m = text2.length();
        int t[n + 1][m + 1];
        for(int i = 0; i < n + 1; i++)
            t[i][0] = 0;
        for(int j = 0; j < m + 1; j++)
            t[0][j] = 0;
        for(int i = 1; i < n + 1; i++)
        {
            for(int j = 1; j < m + 1; j++)
            {
                if(text1[i - 1] == text2[j - 1])
                    t[i][j] = 1 + t[i - 1][j - 1];
                else
                    t[i][j] = max(t[i - 1][j], t[i][j - 1]);
            }
        }
        string s;
        int i = n, j = m;
        while(i > 0 && j > 0)
        {
            if(text1[i - 1] == text2[j - 1])
            {
                s.push_back(text1[i - 1]);
                i--; j--;
            }
            else
            {
                if(t[i][j - 1] > t[i - 1][j])
                {
                    s.push_back(text2[j - 1]);
                    j--;
                }
                else
                {
                    s.push_back(text1[i - 1]);
                    i--;
                }
            }
        }
        while(i > 0)
        {
            s.push_back(text1[i - 1]);
            i--;
        }
        while(j > 0)
        {
            s.push_back(text2[j - 1]);
            j--;
        }
        reverse(s.begin(), s.end());
        return s;
    }
};
int main()
{
    string s1, s2;
    cout << "Enter 2 strings!" << endl;
    cin >> s1 >> s2;
    Solution ob;
    cout << "Shortest common super sequence " << ob.shortestCommonSupersequence(s1, s2);
    return 0;
}
