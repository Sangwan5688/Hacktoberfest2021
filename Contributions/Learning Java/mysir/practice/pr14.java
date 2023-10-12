import java.util.Scanner;

public class pr14 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), sumi = 0;
        for (int i = 0; i <= n; i++) {
            sumi += (2*i);
        }
        System.out.println(sumi);
    }
}
