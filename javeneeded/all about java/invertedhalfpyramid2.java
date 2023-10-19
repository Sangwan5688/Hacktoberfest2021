import java.util.*;
public class invertedhalfpyramid2{
    public static void main(String args[]){
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        for(int i=1;i<=a;i++){
            for(int j=b;j>=i;j--){
                System.out.print("*");
            }System.out.println();
        }

    }
}