/*
    * cout number of subsequence whose sum is k     
    ? https://www.codingninjas.com/codestudio/problems/number-of-subsets_3952532
*/
class Solution{
    int print(int index,vector<int> &arr,int &sumi){
        if(sumi < 0) return 0;
        if(index == arr.size()){
            if(sumi == 0) return 1;
            else return 0;
        }
        
        sumi -= arr[index];
        int left = print(index+1,arr,sumi);

        sumi += arr[index];
        int right = print(index+1,arr,sumi);
        return left + right;
    }
    void solve(){
        int n,sumi;
        cin>>n>>sumi;
        vector<int> v(n);
        for(int i=0;i<v.size();i++){cin>>v[i];}
        cout<<print(0,v,sumi)<<" "<<endl;
    }
};