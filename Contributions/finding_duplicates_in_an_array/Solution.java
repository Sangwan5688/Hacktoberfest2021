class Solution {
    public List<Integer> findDuplicates(int[] nums) {
        List<Integer> output_arr = new ArrayList();
        for(int i=0; i<nums.length; i++) {
            int index = Math.abs(nums[i]) - 1;
            if(nums[index] < 0) output_arr.add(index + 1);
            nums[index] = -nums[index];
        }
        
        return output_arr;
    }
}
