#include<bits/c++.h>
int main()
{
  cout<<"Enter array";
  int ar[10];int x,i;
  for(i=0;i<10;i++)
    cin>>ar[i];
  cout<<"Enter the data to be searched";
  cin>>x;
  for(i=0;i<10;i++)
  {
    if(ar[i]==x;
    {
      flag=true;
      cout<<"Found at index<<i+1<<endl;
      break;
    }
   }
   if(!flag)
   cout<<"Number do not exist in array"<<endl;
   return 0;
   }
