class Solution {
    public List<Integer> grayCode(int n) {
       List<Integer> v = new ArrayList<Integer>();
        for(int i=0; i<1<<n; i++) {
            v.add(i^(i>>1));
        }
        return v;
    }
}
