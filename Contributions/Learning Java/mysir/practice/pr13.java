import java.util.Scanner;

public class pr13 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        for (int i = 0; i < n+1; i++) {
            System.out.print(((2*i) + 1) + " ");
        }
        System.out.println();
    }
}
