import java.util.Collections;
import java.util.Vector;

public class ex51 {
    public static void main(String[] args) {
        Vector<Integer> v = new Vector<>();
        v.add(10);
        v.add(40);
        v.add(20);
        v.add(30);
        System.out.println(v);

        Collections.sort(v);                                    System.out.println(v);
        // ! bs only on sorted ds
        int ind = Collections.binarySearch(v, 40);          System.out.println(ind);

        Collections.swap(v, 0, 3);                          System.out.println(v);
        Collections.reverse(v);                                 System.out.println(v);
        Collections.shuffle(v);                                 System.out.println(v);
    }
}
