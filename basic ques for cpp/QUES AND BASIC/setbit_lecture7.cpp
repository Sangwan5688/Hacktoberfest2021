//count set bit of any 2 inputed numbers 
// eg. a=2=10 ,,, b=3=11,,, so a+b=3<<<<<<output>>>>>>;
#include<bits/stdc++.h>
using namespace std;
int countsetbit(int n)
{
    int count=0;
    while(n)
    {
        int bit=n&1;
        count=count+bit;
        n=n>>1;
    }
    return count;
}

int setbits(int a,int b)
{
    cout<<(countsetbit(a)+countsetbit(b));
}

int main()
{
    int n1,n2;
    cin>>n1>>n2;

    setbits(n1,n2);



    return 0;

}