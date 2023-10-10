 
import java.util.*;
 class Factorial {

	public static void main(String[] args) 
	{
		Factorial f=new Factorial(); 
		f.fact1();
	}
	void fact1()
	{
		 int i,fact=1,n;
		 System.out.println("Enter Number");
		 Scanner sc= new Scanner(System.in);
		 n=sc.nextInt();
		for( i=1;i<=n;i++)
		{
		fact=fact*i;
		}
		System.out.println(fact);
	}
}