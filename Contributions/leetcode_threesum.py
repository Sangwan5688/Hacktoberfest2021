# this is a good leetcode question.
# question link: https://leetcode.com/problems/3sum/

class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        if not nums:
            return []
        elif len(nums) < 3:
            return []

        temp = {}
        for i in range(len(nums)):
            temp[nums[i]] = i

        ans = {}

        for i in range(len(nums)):
            for k in range(len(nums)):
                if i != k:
                    target = 0 - nums[i]
                    sum_ = target - nums[k]
                    if sum_ in temp and i != temp[sum_] and i != k and temp[sum_] != k:
                        to_append = tuple(sorted((sum_, nums[i], nums[k])))
                        if not to_append in ans:
                            ans[to_append] = 0

        return ans
