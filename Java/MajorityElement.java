import java.util.HashMap;
import java.util.Map;

public class MajorityElement {
    public static void main(String[] args) throws Exception {
        System.out.println(majorityElement(new int[]{3,3,4}));
    }

    public static int majorityElement(int[] nums) {
        Map<Integer,Integer> ret = new HashMap<>();
        int result = 0;

         for (int value : nums) {
            if(!ret.containsKey(value)){
                ret.put(value,1);
            } else{
                ret.put(value,ret.get(value)+1);
            }
            if(ret.get(value) > nums.length/2 ){
                result = value;
            }
        }


        return result ;
    }
}
