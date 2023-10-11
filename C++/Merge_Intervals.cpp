Question:- 

Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

 

Example 1:

Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
Example 2:

Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 

Constraints:

1 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 104  
  
Code:- 
  
class Solution 
{
public:
     static bool comparator( vector<int>& a, vector<int>& b )
    {
        return a[0] < b[0];
    }
    vector<vector<int>> merge(vector<vector<int>>& intervals) 
    {
   
        vector<vector<int>> res;
        //Handle Edge cases
        if( intervals.empty() )
        {
            return intervals;
        }
        
        if( intervals.size() == 1 )
        {
            res.push_back( intervals[0]);
            return res;
        }
        
        //Sort the inetrvals first based on the start of interval
        sort( intervals.begin(), intervals.end(), comparator );
        
        //Push the first interval into the result
        res.push_back( intervals[0] );
        int i = 1;
        while( i < intervals.size() )
        {
            vector<int>& last = res.back();
            //Check for overlapping boundaries in the intervals and merge them suitably
            if( last[1] < intervals[i][0] )
            {
                res.push_back( intervals[i] );
            }
            else
            {
                last[1] = max( last[1], intervals[i][1] );
            }
            i++;
        }
        
        return res;
    }
};  
