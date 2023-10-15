public class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums); // Sorted Array
        List<List<Integer>> answer = new ArrayList<>();
        
        if (nums.length < 3) {
            return answer;
        }
        
        if (nums[0] > 0) {
            return answer;
        }
        
        HashMap<Integer, Integer> hashMap = new HashMap<>();
        
        for (int i = 0; i < nums.length; ++i) {
            hashMap.put(nums[i], i);
        }
        
        for (int i = 0; i < nums.length - 2; ++i) {
            if (nums[i] > 0) {
                break;
            }
            
            for (int j = i + 1; j < nums.length - 1; ++j) {
                int required = -1 * (nums[i] + nums[j]);
                if (hashMap.containsKey(required) && hashMap.get(required) > j) {
                    answer.add(Arrays.asList(nums[i], nums[j], required));
                }
                j = hashMap.get(nums[j]);
            }
            
            i = hashMap.get(nums[i]);
        }
        
        return answer;
    }
}
