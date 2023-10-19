import java.util.*;
public class Function2{
    public static int calculateSum(int a, int b){
        int sum = a+b;
        return sum;
    }
    public static void main(String args[]){
        Scanner sc = new Scanner(System.in);
        int a=sc.nextInt();
        int b=sc.nextInt();
        int sum=calculateSum(a,b);
        System.out.println("sum of the two number is : "+sum);
        

    }
}