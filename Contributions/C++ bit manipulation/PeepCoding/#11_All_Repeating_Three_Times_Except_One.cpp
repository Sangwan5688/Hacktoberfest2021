/*
    TODO: All Repeating Three Times Except One
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/all-repeating-three-times-except-one-official/ojquestion
*/

// ! 2 element repeating logic
#include "bits/stdc++.h"
using namespace std;

void solve(){
    int one = 0,two = 0,n;
    cin>>n;
    vector<int> v(n);
    for(int i=0;i<v.size();i++){cin>>v[i];}

    for (int i = 0; i < v.size(); ++i){
        for(int j=0;j<32;j++){
            int mask = (1 << j);
            int check = ((v[i] & mask) == mask);
            int oneCheck = ((one & mask) == mask);
            int twoCheck = ((two & mask) == mask);
            if(check){
                // cout<<oneCheck<<" "<<twoCheck<<endl;

                if(oneCheck == 0 and twoCheck == 0){
                    one = one | mask;
                }else if(twoCheck == 0){
                    one = one & (~mask);
                    two = two | mask;
                }else if(oneCheck == 0){
                    one = one & (~mask);
                    two = two & (~mask);
                }
            }
        }
        // cout<<one<<endl;
        // cout<<two<<endl;
    }

    cout<<one<<endl;
}

// ! optimal

void solve(){
    int n;
    cin>>n;
    vector<int> v(n);
    for(int i=0;i<v.size();i++){cin>>v[i];}

    int tn = INT_MAX, tnp1 = 0, tnp2 = 0;
    for (int i = 0; i < v.size(); ++i){
        int cwtn = v[i] & tn;
        int cwtnp1 = v[i] & tnp1;
        int cwtnp2 = v[i] & tnp2;

        tn = tn & (~cwtn);
        tnp1 = tnp1 | cwtn;

        tnp1 = tnp1 & (~cwtnp1);
        tnp2 = tnp2 | cwtnp1;

        tnp2 = tnp2 & (~cwtnp2);
        tn = tn | cwtnp2;
    }
    cout<<tnp1<<endl;
}

// ? Brute
#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

void solve(){
    int n;
    cin>>n;
    vector<int> v(n);
    for(int i=0;i<v.size();i++){cin>>v[i];}

    vector<int> bits(32,0);
    for (int i = 0; i < v.size(); ++i){
        for(int j = 0;j<32;j++){
            int mask = (1 << j);
            bits[j] += ((mask & v[i]) == mask); 
        }
    }

    int no = 0;
    for(int i=0;i<bits.size();i++){
        no = no + pow(2,i)*(bits[i]%3 != 0);
    }

    cout<<no<<endl;

}

signed main(){
    ios_base::sync_with_stdio(false);cin.tie(NULL);
    int t = 1;
    // cin>>t;
    while(t--) solve();
    return 0;
}