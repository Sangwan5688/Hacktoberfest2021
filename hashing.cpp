#include<bits/stdc++.h>
#define mod 1000000007
using namespace std;
typedef long long ll;

ll dp[1000005],inv[1000005];

ll power(ll a , ll n)
{
	ll result = 1;
 
	while(n)
	{
		if(n & 1) result = (result * a) % mod;
 
		n >>= 1;
		a = (a * a) % mod;
	}
 
	return result;
}

ll modInverse(ll a, ll m) 
{
    return power(a, m-2); 
} 

ll gethash(string s)    //hash any string
{
    ll val=0;
    ll p=31;
    ll pp=1;
    for(char ch:s)
    {
        val=(val+(((ch-'a'+1)*pp)%mod))%mod;
        pp=(pp*p)%mod;
    }
    return val%mod;
}

void init(string s)     //initialises with string in which subhash has to be done
{
    ll p=31,pp=1;
    inv[0]=1;
    dp[0]=(s[0]-'a'+1);
    for(ll i=1;i<s.size();i++)
    {
        char ch=s[i];
        pp=(pp*p)%mod;
        inv[i]=modInverse(pp,mod);
        dp[i]=(dp[i-1]+((ch-'a'+1)*pp)%mod)%mod;
    }
}
ll subHash(ll l,ll r)   //find hash of substring of a initialised string in init function
{
    ll ans=dp[r];
    if(l>0)ans=(ans-dp[l-1]+mod)%mod;
    ans=(ans*inv[l])%mod;
    return ans;
}