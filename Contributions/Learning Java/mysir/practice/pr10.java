import java.util.Scanner;

public class pr10 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        boolean flag = true;
        for(int i=2;i*i<=a;i++){
            if(a%i == 0){
                flag = false;
            }
        }
        if(flag)
            System.out.println("Prime Number");
        else 
            System.out.println("~ a prime number");
    }
}
