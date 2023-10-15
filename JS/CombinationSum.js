class CombinationSum {
    combinationSum(candidates, target) {
        const results = [];
        const comb = [];

        this.backtrack(target, comb, 0, candidates, results);
        return results;
    }

    backtrack(remain, comb, start, candidates, results) {
        if (remain === 0) {
            results.push([...comb]);
            return;
        } else if (remain < 0) {
            return;
        }

        for (let i = start; i < candidates.length; i++) {
            comb.push(candidates[i]);
            this.backtrack(remain - candidates[i], comb, i, candidates, results);
            comb.pop();
        }
    }
}

// Example usage:
const solution = new CombinationSum();
const candidates = [2, 3, 6, 7];
const target = 7;
const results = solution.combinationSum(candidates, target);

results.forEach(result => {
    console.log(result.join(' '));
});
