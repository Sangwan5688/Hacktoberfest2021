import java.util.Scanner;

public class pr7 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(),ans = 1;
        for (int i = 1; i < n+1; i++) {
            ans *= i;
        }
        System.out.println(ans);
    }
}
