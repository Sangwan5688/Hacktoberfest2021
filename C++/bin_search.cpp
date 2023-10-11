# include <bits/stdc++.h>
using namespace std;
int main()

{
    int n ; 
    cout<<" Enter no integers "<< endl;
    cin >> n ;
    cout<<" Enter  Your numbers "<< endl;
    vector<int> a(n);
    for (int  i = 0; i < n; i++)
    {
       cin >> a[i];
    }
    int to_find;
    
    cout<<" Enter no to search "<< endl;
     cin>> to_find;
    int low = 0 , high = n-1 ;
    int mid;
    cout<<" your key is  "<< endl;
     while (high - low > 1)
     {
         int mid = (high + low)/2;
         if (a[mid]<to_find)
         {
             low = mid +1;
         }
         else
         {
             high = mid;
         }

     }
     if (a[low]==to_find)
     {
         cout<<low << endl;
     }
     else if(a[high]== to_find)
     {
        cout<< high << endl;
     }
     else{
         cout<<"Not Found";
     }
    
}
