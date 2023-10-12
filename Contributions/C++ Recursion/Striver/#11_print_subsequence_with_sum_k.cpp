/*  
    * print subsequence with sum k 
    ! in this when using backtracking first we have to subtract then add 
    ! when using recursion first we have to add then subtract
*/
class Solution{
    public:
    void print(int index,vector<int> &v,vector<int> &ds,
        vector<vector<int>> &ans,int sumi){
        if(index == v.size()){
            if(sumi == 0) ans.push_back(ds);
            return;
        }
        ds.push_back(v[index]);
        sumi -= v[index];
        print(index+1,v,ds,ans,sumi);

        ds.pop_back();
        sumi += v[index];
        print(index+1,v,ds,ans,sumi);
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
