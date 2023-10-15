/* 
    TODO: Allocate Books
    ? https://www.interviewbit.com/problems/allocate-books/
 */

bool isPossible(vector<int> &arr, int mid, int B) {
    int sumi = 0, n = arr.size(), cnt = 0;
    for(int i=0;i < n;i++) {
        sumi += arr[i];
        if(sumi == mid) {
            sumi = 0;
            cnt++;
        } else if(sumi > mid) {
            sumi = arr[i];
            if(i == n-1) cnt++;
            cnt++;
        } else if(sumi < mid and i == n-1) cnt++;
    }
    return (cnt <= B);
}

int Solution::books(vector<int> &arr, int B) {
    if(arr.size() < B) return -1;
    
    int sumi = 0, maxi = 0;
    for(auto no : arr) sumi += no, maxi = max(maxi, no);
    int low = maxi, high = sumi, ans = 1e9;
        
    while(low <= high) {
        int mid = low + ((high - low) >> 1);
        
        if(isPossible(arr,mid,B)) {
            ans = min(ans,mid); 
            high = mid-1;
        } else low = mid+1;
    }
    return ans == 1e9 ? -1 : ans;
}
