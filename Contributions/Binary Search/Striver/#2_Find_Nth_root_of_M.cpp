/* 
    TODO: Find Nth root of M
    ? https://practice.geeksforgeeks.org/problems/find-nth-root-of-m5843/0?company%5B%5D=Directi&page=1&query=company%5B%5DDirectipage1
    ! divide by 2.0 ~ by 2
    ! mid+1 -> mid
    ! mid-1 -> mid
 */

class Solution{
	public:
	double value(double no, int n) {
        double res = 1;
        while(n--) res *= no;
        return res;
    }
	int NthRoot(int n, int m) {
        double low = 1, high = m;

        while((high - low) >= 1e-6) {
            double mid = low + ((high - low)/2.0);
            double val = value(mid,n);
            if(val == m) return mid;
            else if(val < m) low = mid;
            else high = mid;
        }
        if(value((int)high,n) != m) return -1;
        return high;
	}  
};

