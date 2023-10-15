import java.util.ArrayList;
public class ex43 {
    public static void main(String[] args) {
        ArrayList<Integer> l1 = new ArrayList<>(4);
        l1.add(1);
        l1.add(2);
        l1.add(3);
        l1.add(1,231);
        for (Integer i : l1) {
            System.out.println(i);
        }
    }
}
