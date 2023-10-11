import java.util.Scanner;

public class ReverseUsingStaticMethod {

	public static void main(String[] args) {
		 int n,result;
		 Scanner sc=new Scanner(System.in);
		 System.out.println("Enter your number");
		 n=sc.nextInt();
        result = ReverseUsingStaticMethod.reverse(n) ;
	System.out.println("Reverse of Number is " +result);
	}

	
	public static int reverse(int n1)
	{
		int rev=0,r;
		while(n1>0)
        {
       	 r=n1%10;
       	 rev=rev*10+r;
       	 n1=n1/10;
        }
        return rev;
	}
}
