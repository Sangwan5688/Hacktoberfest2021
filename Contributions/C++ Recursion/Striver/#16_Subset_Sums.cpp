/*
    * Subset Sums
    ? https://practice.geeksforgeeks.org/problems/subset-sums2234/1
    ! There is no need of sorting    
*/
class Solution{
    public:
    vector<vector<int>> pre(vector<int> arr){
        vector<vector<int>> res;
        int n = arr.size();
        for(int i=0;i<(1<<n);i++){
            vector<int> temp;
            for(int j=0;j<n;j++){
                if(i & (1 << j)) temp.push_back(arr[j]);
            }
            res.push_back(temp);
        }
        return res;
    }
    vector<int> subsetSums(vector<int> arr, int N){
        vector<int> res;
        
        vector<vector<int>> ans = pre(arr);
        
        for(auto i : ans){
            int sumi = 0;
            for(auto j : i) sumi += j;
            res.push_back(sumi);
        }
        
        sort(res.begin(),res.end());
        return res;
    }
};

class Solution{
    public:
    void pre(int index,vector<int> &arr,int &sumi,vector<int>&res){
        if(index == arr.size()){
            res.push_back(sumi);
            return;
        }
        sumi += arr[index];
        pre(index+1,arr,sumi,res);
        sumi -= arr[index];
        pre(index+1,arr,sumi,res);
    }
    vector<int> subsetSums(vector<int> arr, int N){
        vector<int> res;
        int sumi = 0;
        pre(0,arr,sumi,res);
        sort(arr.begin(),arr.end());
        return res;
    }
};