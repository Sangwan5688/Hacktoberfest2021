#include<stdio.h>
#include<string.h>
void main()
{
   char a[100],b[100];
   int i,l;
   
   printf("Enter String : ");
   gets(a);
   
  for(i=0; a[i]!=NULL; i++)
  {
  	  b[i] = a[i];
  }
   
   strrev(b);
   
   printf("%s",b);
   
   if(strcmp(a,b) == 0)
   {
   	  printf("\nPalindrome");
   }
   else
   {
   	  printf("\nnot");
   }
   	
   	
	
}
