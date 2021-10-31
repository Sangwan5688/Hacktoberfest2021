//Sujin Skaria Philip
//Roll no : 61

#include <stdio.h>
float p(float a,float b)
    {
        if (b!= 0)
            return (a*p(a,b-1));
        else
            return 1;
    }
void main()
{
    int k[10],i,n,pwr;
    float x,s;
    printf ("Value of x:\n");
    scanf ("%f",&x);
    printf ("Order of polynomial:\n");
    scanf ("%d",&n);
    pwr=n;
    printf ("Enter %d coefficients\n", n+ 1);
    for (i=0;i<=n;i++)
        {scanf("%d",&k[i]);}
    s=0;
    for (i=0;i<=n;i++)
        {
        s=s+k[i]*p(x,i);
       }//s= s*x+k[i];
    
    printf ("The polynomial is: \n");
    for (i=0;i<=n;i++)
   {
       if (pwr<0)
           break;
       
        printf ("%d*(x^%d) + ",k[i],pwr--);
    }
    printf ("\nSum of the polynomial = %6.2f \n",s);
}
