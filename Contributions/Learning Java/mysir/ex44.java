import java.util.*;

public class ex44 {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(45);
        list.add(5);
        list.add(4);
        list.add(425);
        for (Integer integer : list) {
            System.out.println(integer);
        }

        LinkedList<String> l1 = new LinkedList<>();
        l1.addFirst("vishal");
        l1.add(1,"tapun");
        l1.addLast("kumar");
        System.out.println(l1.getFirst());
        System.out.println(l1.get(1));
        System.out.println(l1.getLast());

        Vector<Integer> v = new Vector<>();
        v.add(45);
        v.add(453);
        v.add(415);
        v.add(45432);
        System.out.println("we are in vector of java");
        for (Integer integer : v) {
            System.out.println(integer);
        }

        Stack<Integer> st = new Stack<>();
        st.push(456);
        st.push(8778);
        System.out.println(st.peek());
    }
}
