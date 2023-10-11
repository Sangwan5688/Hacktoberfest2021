import java.util.Scanner;
public class Main {

    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        System.out.print("Enter the Number :- ");
        int a =sc.nextInt();
        System.out.println("The Prime number till "+a+" are :-");
        for(int i=2;i<=a;i++)
        {
            int counter=0;
            for(int j=2;j<=i;j++)
            {
                if(i%j==0)
                {
                    counter +=1;
                }
            }
            if (counter==1)
            {
                System.out.println(i+" ");
            }
        }
    }
}
