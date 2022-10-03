#include<bits/stdc++.h>
using namespace std;

int squares(int a, int b) {
  int A,B;
  A=ceil(sqrt(a));
  B=floor(sqrt(b));
  if( B*B>b)
  {
      return 0;
  }
  else{
      return B-A+1;
  }

}
int main()
{
    #ifndef ONLINE_JUDGE
    freopen("input.txt","r",stdin);
    freopen("output.txt","w",stdout);
    #endif
    int a,b;
   cin>>a>>b;
   cout<<squares(a, b);


    return 0;
}