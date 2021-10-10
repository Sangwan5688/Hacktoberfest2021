import java.util.*;
public class Armstrong{
   public static void main(String[] args)
   {									
       int rem,que,rem1,que2,num;
	   
	   Scanner sc = new Scanner(System.in);
	  
	  num=sc.nextInt();

	   rem=num%10;
		que=num/10;
	   rem1=que%10;
	   que2=que/10;
	   
	   
	   int arm  = (int) (Math.pow(rem,3)+Math.pow(rem1,3)+Math.pow(que2,3));
	   
	   
	   if(arm==num){
	   System.out.println(num +" is a Armstrong number");
	   
	   }
	   
	   else{
	   System.out.println(num +" is not a Armstrong number");
	   }
	   
	   
	   
	   
	   
	   
   }
}


