#include<iostream>
#include<cstdio>
#include<cmath>
using namespace std;
int binary_search(int A[], int l, int r, int key) 
{
  int m;
  while( l <= r )     
  {
    m = l + (r-l)/2;
    if( A[m] == key )     // Element found
      return m;
    if( A[m] < key )         // Search in right part of list
      l = m + 1;
    else            // Search in left part of list
      r = m - 1;
  }
  return -1;
}

int main() 
{
  int tag, x, array[]={10,11,12,13,14,25,26,37,48,59};
  x = 26;        // element to be searched in the array
  tag=binary_search(array,0,10,x);
  if(tag != -1)
    cout<<"Element found at location : "<<tag;
  else
    cout<<"Element not present in the array.";
  return 0;
}
