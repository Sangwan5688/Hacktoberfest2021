//Program that checks the frequency of Prime adam numbers within a specified input range
import java.util.*;
class prime_adam
{
    int num;
    int prime(int n)
    {
        int c=0;
        for(int i=1;i<n;i++)
        {
            if(n%i==0)
                c++;
        }
        if (c==1)
            return 1;
        else 
            return 0;
    }
    int rev(int n)
    {
        int ncopy=n,s=0;
        while(n>0)
        {
            int r=n%10;
            s=r+(s*10);
            n=n/10;
        }
        return(s);
    }
    int adam(int n)
    {
        int revn=rev(n);
        int sqrevn=revn*revn;
        int revsq=rev(n*n);
        if(sqrevn==revsq)
            return 1;
        else 
            return 0;
    }
    public static void main ()
    {
        Scanner sc= new Scanner(System.in);
        prime_adam ob=new prime_adam();
        System.out.println("enter initial range");
        int m=sc.nextInt();
        System.out.println("enter final range");
        int n=sc.nextInt(), count=0;
        if(m>=n) System.out.println("wrong input");
        for(int i=m; i<=n;i++)
        {
            int c1=ob.prime(i);
            int c2=ob.adam(i);
            if(c1==1 && c2==1)
               { System.out.print(i + "  ");
                 count++;
               }
        }
        System.out.println("frequency=" + count);
    }
}
/**
 * VividhPandey003
 */
