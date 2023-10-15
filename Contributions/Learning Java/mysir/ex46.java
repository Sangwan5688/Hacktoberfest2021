import java.util.HashSet;
import java.util.LinkedHashSet;

public class ex46 {
    public static void main(String[] args) {
        HashSet<Integer> st = new HashSet<>();
        st.add(5);
        st.add(4);
        st.add(4);
        st.add(35);

        System.out.println(st);

        HashSet st1 = new HashSet<>(st);
        st1.add("vishal kumar");
        st1.add(123123);
        System.out.println(st1);

        LinkedHashSet st2 = new LinkedHashSet<>(st1);
        st2.add(56545);
        System.out.println(st2);
    }
}
