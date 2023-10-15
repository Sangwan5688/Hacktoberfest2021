int minimumTotal(vector<vector<int>>& a) {
        if(a.size()==1)
        return a[0][0];
        int m=a.size();

        for(int i=1;i<m;i++){
            
            for(int j=0;j<a[i].size();j++){
                if(j-1>=0 && j<a[i-1].size()){
                    a[i][j]+=min(a[i-1][j],a[i-1][j-1]);
                    
                }
                else if(j>=0 && j<a[i-1].size())
                a[i][j]+=a[i-1][j];
                else
                a[i][j]+=a[i-1][j-1];
                
            }
        }
        int mini=INT_MAX;
        for(int j=0;j<m;j++){
            mini=min(mini,a[m-1][j]);
        }
        return mini;
    }
