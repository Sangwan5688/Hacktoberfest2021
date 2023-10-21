import java.util.*;
public class function8{
    public static void evenOrNot(int n){
        if(n%2==0){
            System.out.println("even");
        }else{
            System.out.println("not even");
        }
    }
    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();

        evenOrNot(n);
    }

}
