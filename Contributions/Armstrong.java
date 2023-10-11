import java.util.Scanner;

class Armstrong_number

{

    public static void main(String[] args) 

    {

    

    Scanner sc = new Scanner(System.in);

    int n=sc.nextInt();

    int r = 0;

    int a = 0;

    int s = 0;

    r=n;

    while(r!=0)  

   {

       a=r%10;

       s=s+a*a*a;

       r=r/10; 

   } 

   if(s==n)

   System.out.println( n + " is a armstrong number");

   else

   System.out.println( n + " is not a armstrong number");

    }

}
