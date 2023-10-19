import java.util.*;
public class flouds_triangle{
    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        int m=1;
        for(int i=1;i<=n;i++){
            for(int j=1;j<=i;j++){
                System.out.print(" "+m);
                m++;
            }System.out.println();
        }
    }
}