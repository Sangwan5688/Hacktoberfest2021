import java.util.HashMap;
import java.util.PriorityQueue;

public class ex50 {
    public static void main(String[] args) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.offer(123);pq.offer(12);pq.offer(1);pq.offer(2131);
        System.out.println(pq);
        System.out.println(pq.poll());
        System.out.println(pq.poll());
        System.out.println(pq.poll());

        HashMap<String,Integer> mp = new HashMap<>();
        mp.put("vishal", 12);
        mp.put("vivek", 112);
        mp.put("yash", 122);
        mp.put("tushar", 102);
        System.out.println(mp);
        System.out.println(mp.get("vivek"));
        System.out.println(mp.keySet());
        System.out.println(mp.entrySet());
        System.out.println(mp.containsKey("tushar"));
        mp.remove("vishal");

        
    }
}
