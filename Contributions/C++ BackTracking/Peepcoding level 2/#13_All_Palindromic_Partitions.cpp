/* 
    TODO: All Palindromic Partitions
    ? https://practice.geeksforgeeks.org/problems/find-all-possible-palindromic-partitions-of-a-string/1
 */

//! C++
class Solution {
  public:
    vector<vector<string>> ans;
    bool isPali(string s) {
        int low = 0, high = s.size() - 1;
        while(low <= high) if(s[low++] != s[high--]) return false;
        return true;
    }
    void pre(int ind, string s, vector<string> ds) {
        int n = s.size();
        string tmp = "";
        
        if(ind == n) {
            ans.push_back(ds);
            return;
        }
        
        for(int i=ind; i<s.size();i++) {
            tmp.push_back(s[i]);
            
            if(isPali(tmp)) {
                ds.push_back(tmp);
                pre(i+1, s, ds);
                ds.pop_back();   
            }
        }
    }
    vector<vector<string>> allPalindromicPerms(string s) {
        ans.clear();
        pre(0, s, {});
        return ans;
    }
};

//! Java
class Solution {    
    static ArrayList<ArrayList<String>> ans = new ArrayList<>();
    static boolean isPali(String s) {
        int low = 0, high = s.length() - 1;
        while(low <= high) 
            if(s.charAt(low++) != s.charAt(high--)) return false;
        return true;
    }
    static void pre(int ind, String s, ArrayList<String> ds) {
        int n = s.length();
        String tmp = "";
        
        if(ind == n) {
            ans.add(new ArrayList<>(ds)); // Create a new ArrayList for ds to avoid reference issues
            return;
        }
        
        for(int i=ind; i<n;i++) {
            tmp += s.charAt(i);
            
            if(isPali(tmp)) {
                ds.add(tmp);
                pre(i+1, s, ds);
                ds.remove(ds.size() - 1);
            }
        }
    }
    static ArrayList<ArrayList<String>> allPalindromicPerms(String S) {
        ans.clear();
        ArrayList<String> ds = new ArrayList<String>();
        pre(0, S, ds);
        return ans;
    }
};