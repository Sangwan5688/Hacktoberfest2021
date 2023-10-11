Example Input:
5

Output:

*****    
  ****   
    ***  
      ** 
        *
      ** 
    ***  
  ****   
*****    


//java program

import java.util.Scanner;
public class Main
{
    public static void main(String args[])  
    {  
        Scanner scan = new Scanner(System.in);
        int n=scan.nextInt();
        for (int i=0;i<n;i++)
        {
        for (int j=0;j<n;j++)
            if(j<i)
                System.out.print("  ");
            else
                System.out.print("*");
        System.out.println();
        } 
        for (int i= 2; i<=n;i++)
        { 
          for (int j= 0; j< n;j++)
            if(j<n-i)
                System.out.print("  ");
            else
                System.out.print("*");
        System.out.println();
        }
     }
}




