import java.util.HashMap;
import java.util.Map;

public class FibonacciMemoization {

    public static void main(String[] args) {
        System.out.println(fibRecursiveMemoization(10));
    }

    private static final Map<Integer, Integer> memo = new HashMap<>();

    static {
        memo.put(0, 0);
        memo.put(1, 1);
    }

    public static int fibRecursiveMemoization(int n) {
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        memo.put(n, fibRecursiveMemoization(n - 1) + fibRecursiveMemoization(n - 2));

        return memo.get(n);
    }

}
