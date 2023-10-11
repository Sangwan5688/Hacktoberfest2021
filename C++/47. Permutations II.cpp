//https://leetcode.com/problems/permutations-ii/
//Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.

class Solution {
public:
    vector<vector<int> > permuteUnique(vector<int>& nums) {
        sort(nums.begin(), nums.end());

        unordered_map<int, int> count_map;
        for (int i : nums) {
            if (count_map.find(i) != count_map.end())
                count_map[i]++;
            else
                count_map[i] = 1;
        }

        vector<pair<int, int> > counters;
        for (auto p : count_map) {
            counters.push_back(p);
        }
        sort(counters.begin(), counters.end());
        unordered_map<int, int> selected;
        for (auto p : counters) {
            selected[p.first] = 0;
        }

        vector<vector<int>> result;
        vector<int> p;

        n = nums.size();
        permute(counters, selected, p, result);
        return result;
    }

private:
    size_t n;
    typedef vector<pair<int, int> >::const_iterator Iter;

    void permute(const vector<pair<int, int> > &counters,
            unordered_map<int, int> &selected, 
            vector<int> &p, vector<vector<int> > &result) {
        if (n == p.size()) {  
            result.push_back(p);
        }

        for (auto counter : counters) {
            if (selected[counter.first] < counter.second) {
                p.push_back(counter.first);
                selected[counter.first]++;
                permute(counters, selected, p, result);
                p.pop_back();
                selected[counter.first]--;
            }
        }
    }
};
