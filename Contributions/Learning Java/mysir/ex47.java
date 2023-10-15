import java.util.*;

public class ex47 {
    public static void main(String[] args){
        TreeSet<Integer> st = new TreeSet<>();
        st.add(123123);st.add(123123);st.add(3);st.add(12);st.add(13);st.add(122);
        System.out.println("All Element" + st);
        System.out.println("First Element : " + st.first());
        System.out.println("Last Element : " + st.last());
        System.out.println("Less than element : " + st.headSet(12));
        System.out.println("Greater than element : " + st.tailSet(12));
        System.out.println("Subset : " + st.subSet(1, 122));
        // ! fromEle is included but ~ toEle
        System.out.println(st.comparator());

        NavigableSet<Integer> st1 = new TreeSet<>(st);
        System.out.println(st1);
        System.out.println(st1.ceiling(11));
        System.out.println(st1.floor(5));
        System.out.println(st1.higher(5));
        System.out.println(st1.lower(5));
        System.out.println(st1.pollFirst());
        System.out.println(st1.pollLast());

    }
}
