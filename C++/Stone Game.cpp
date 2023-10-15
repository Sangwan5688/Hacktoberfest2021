int dp[501][501];
    int help(vector<int>&a,int i,int j){
        if(i>j)
        return 0;
        if(dp[i][j]!=-1)
        return dp[i][j];
        int l=a[i]+min(help(a,i+1,j-1),help(a,i+2,j));
        int r=a[j]+min(help(a,i,j-2),help(a,i+1,j-1));
        return dp[i][j]=max(l,r);
    }
    bool stoneGame(vector<int>& a) {
        memset(dp,-1,sizeof(dp));
        int s=0;
        for(int i=0;i<a.size();i++)
        s+=a[i];
        return ((2*help(a,0,a.size()-1))>s) ? true : false;
    }
