import java.util.*;
public class invertedpyramid2{
    public static void main(String args[]){
        Scanner s = new Scanner(System.in);
        int a = s.nextInt();
        // int b = s.nextInt();
        for(int i=1;i<=a;i++){
            for(int j=1;j<=a-i;j++){
                System.out.print(" ");
            }for(int k=1;k<=i;k++){
                System.out.print("*");
            }
            System.out.println();
        }
    }
}