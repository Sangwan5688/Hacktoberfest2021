class CombinationSum:
    def combinationSum(self, candidates, target):
        results = []
        comb = []

        def backtrack(remain, comb, start):
            if remain == 0:
                results.append(list(comb))
                return
            elif remain < 0:
                return

            for i in range(start, len(candidates)):
                comb.append(candidates[i])
                backtrack(remain - candidates[i], comb, i)
                comb.pop()

        backtrack(target, comb, 0)
        return results

# Example usage:
solution = CombinationSum()
candidates = [2, 3, 6, 7]
target = 7
results = solution.combinationSum(candidates, target)

for result in results:
    print(result)
