/*  
    * print any subsequence whose sum is k 
*/
class Solution{
    bool print(int index,vector<int> &v,vector<int> &ds,
        vector<vector<int>> &ans,int sumi){
        if(index == v.size()){
            if(sumi == 0){
                ans.push_back(ds);  
                return true;
            } 
            return false;
        }
        ds.push_back(v[index]);
        sumi -= v[index];
        if(print(index+1,v,ds,ans,sumi)) return true;

        ds.pop_back();
        sumi += v[index];
        if(print(index+1,v,ds,ans,sumi)) return true;
    }
    void solve(){
        int n,sumi;
        cin>>n>>sumi;
        vector<int> v(n),ds;
        vector<vector<int>> ans;
        for(int i=0;i<v.size();i++){cin>>v[i];}
        print(0,v,ds,ans,sumi);
        for(auto i : ans){
            for(auto j : i){
                cout<<j<<" ";
            }
            cout<<endl;
        }
    }
};