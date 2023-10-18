#include<bits/stdc++.h>
using namespace std;

bool checkPalindrome(string str,int i,int j)
{
    if(i>j)
    {
        return 1;
    }

    if(str[i]!=str[j])
    {
        return 0;
    }else{
        //i++,j--;
        return checkPalindrome(str,++i,--j);
    }
    /*When you use the post-increment (i++) and post-decrement (j--) operators, 
    they increment or decrement the values of i and j respectively after they are 
    used in the recursive call. So, the updated values are not used in the same call. 
    To fix this, you should use pre-increment (++i) and pre-decrement (--j) operators*/
    
}

int main()
{
    string name;
    cin>>name;

    cout<<checkPalindrome(name,0,name.length()-1);

    return 0;
}