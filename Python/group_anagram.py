# the problem statement can be found here: https://leetcode.com/problems/group-anagrams/


def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        hmap = collections.defaultdict(list)
        for i in range(len(strs)):
            element = "".join(sorted(strs[i]))
            hmap[element].append(strs[i])
        return [i for i in hmap.values()]
