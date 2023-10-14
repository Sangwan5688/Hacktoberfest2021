#include <iostream>
#include <vector>

class CombinationSum {
public:
    std::vector<std::vector<int>> combinationSum(std::vector<int>& candidates, int target) {
        std::vector<std::vector<int>> results;
        std::vector<int> comb;

        backtrack(target, comb, 0, candidates, results);
        return results;
    }

protected:
    void backtrack(int remain, std::vector<int>& comb, int start, std::vector<int>& candidates, std::vector<std::vector<int>>& results) {
        if (remain == 0) {
            results.push_back(comb);
            return;
        } else if (remain < 0) {
            return;
        }

        for (int i = start; i < candidates.size(); i++) {
            comb.push_back(candidates[i]);
            backtrack(remain - candidates[i], comb, i, candidates, results);
            comb.pop_back();
        }
    }
};

int main() {
    CombinationSum solution;
    std::vector<int> candidates = {2, 3, 6, 7};
    int target = 7;
    std::vector<std::vector<int>> results = solution.combinationSum(candidates, target);

    for (const std::vector<int>& result : results) {
        for (int num : result) {
            std::cout << num << " ";
        }
        std::cout << std::endl;
    }

    return 0;
}
