import java.util.*;

public class ex48 {
    public static void main(String[] args) {
        TreeSet<Integer> st = new TreeSet<>();
        st.add(123);st.add(13);st.add(12);st.add(23);st.add(103);
        System.out.println(st);

        TreeSet st1 = new TreeSet<>();
        st1.add(123); //! Hetrogenous element ~ allow
        st1.add("vishal");
        st1.add(null); // ! can'~ put null value
        System.out.println(st1);
    }
}
