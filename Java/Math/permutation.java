import java.math.BigInteger;
import java.util.Scanner;

public class permutation {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Total objects");
        int N = sc.nextInt();
        System.out.println("Selected objects");
        int M = sc.nextInt();
        int R = N - M;
        BigInteger FN = BigInteger.valueOf(1), p;
        BigInteger FR = BigInteger.valueOf(1);
        for (int i = 1; i <= N; i++) {
            FN = FN.multiply(BigInteger.valueOf(i));
        }
        for (int j = 1; j <= R; j++) {
            FR = FR.multiply(BigInteger.valueOf(j));
        }
        p = FN.divide(FR);
        System.out.println(p);
    }
}
