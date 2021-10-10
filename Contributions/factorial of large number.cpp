//@soumyaagr427

#include <bits/stdc++.h>
using namespace std;


class Solution {
public:

    void multiply(int x,vector<int>&res,int res_size)
    {
        int carry=0;
        
        for(int i=0;i<res.size();i++)
        {
            int prod=res[i]*x+carry;
            
            res[i]=prod%10;
            
            carry=prod/10;
        }
        
        while(carry)
        {
            int r=carry%10;
            res.push_back(r);
            carry/=10;
            res_size++;
        }
        
       
    }

    vector<int> factorial(int N)
    {
        // code here
        vector<int>res;
        res.push_back(1);
        
        int res_size=1;
        
        
        for(int x=2;x<=N;x++)
        {
            multiply(x,res,res_size);
        }
        
         reverse(res.begin(),res.end());
         return res;
     }
};



int main() {
    int t;
    cin >> t;
    while (t--) {
        int N;
        cin >> N;
        Solution ob;
        vector<int> result = ob.factorial(N);
        for (int i = 0; i < result.size(); ++i){
            cout<< result[i];
        }
        cout << endl;
    }
    return 0;
}  
