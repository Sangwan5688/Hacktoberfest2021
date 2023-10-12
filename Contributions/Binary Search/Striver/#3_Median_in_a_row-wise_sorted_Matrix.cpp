/* 
    TODO: Median in a row-wise sorted Matrix
    ? https://practice.geeksforgeeks.org/problems/median-in-a-row-wise-sorted-matrix1527/1
    ! lower_bound & upper_bound do ~ work inside matrix
 */
class Solution{   
    vector<vector<int>> matrix;
public:
    int countSmallerThanMid(vector<int>& arr, int mid) {
        int cnt = 0, m = arr.size();
        int index = upper_bound(arr.begin(), arr.end(), mid) - arr.begin();
        if(index - 1 < m) cnt += index;
        else cnt += m;
        return cnt;
    }
    int smaller(int mid) {
        int n = matrix.size(), m = matrix[0].size(), cnt = 0;
        for(int i=0;i<n;i++) cnt += countSmallerThanMid(matrix[i], mid);
        return cnt;
    }
    int median(vector<vector<int>> &matrix, int r, int c){
        int low = 0, high = 1500, target = (r*c)/2, ans = -1;
        this->matrix = matrix;
        
        //! target = (r*c)/2
        
        while(low <= high) {
            int mid = low + ((high - low)/2);
            int value = smaller(mid);

            if(value <= target) low = mid+1;
            else high = mid-1;
            
        }
        
        return low; //! retrun low
    }
};

//! Brute of copying vector again without refrence
 class Solution{   
    vector<vector<int>> matrix;
public:
    int smaller(int mid) {
        int n = matrix.size(), m = matrix[0].size(), cnt = 0;
        
        for(int i=0;i<n;i++) {
            vector<int> arr = matrix[i];
            int index = upper_bound(arr.begin(), arr.end(), mid) - arr.begin();
            if(index - 1 < m) cnt += index;
            else cnt += m;
        }
        return cnt;
    }
    int median(vector<vector<int>> &matrix, int r, int c){
        int low = 0, high = 1500, target = (r*c)/2, ans = -1;
        this->matrix = matrix;
        
        //! target = (r*c)/2
        
        while(low <= high) {
            int mid = low + ((high - low)/2);
            int value = smaller(mid);

            if(value <= target) low = mid+1;
            else high = mid-1;
            
        }
        
        return low; //! retrun low
    }
};