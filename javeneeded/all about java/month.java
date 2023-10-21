import java.rmi.StubNotFoundException;
import java.util.*;
public class month{
    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        switch(n){
            case 1 : System.out.println("january");
            break;
            case 2 : System.out.println("february");
            break;
            case 3 : System.out.println("march");
            break;
            case 4 : System.out.println("april");
            break;
            case 5 : System.out.println("may");
            break;
            case 6 : System.out.println("june");
            break;
            case 7 : System.out.println("july");
            break;
            case 8 : System.out.println("august");
            break;
            case 9 : System.out.println("september");
            break;
            case 10 : System.out.println("october");
            break;
            case 11 : System.out.println("november");
            break;
            case 12 : System.out.println("december");
            break;
            default : System.out.println("invalid number");

        }

    }
}