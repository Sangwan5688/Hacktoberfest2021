#include <stdio.h>
#include <stdlib.h>

 int main() {
 	int n,i;
 	printf("Enter the number of elements \n");
 	scanf("%d",&n);
 	int a[n];
 	int *p;
 	p=a;
 	printf("Enter the elements\n");
 	for(i=0;i<n;i++)
 	{
 		scanf("%d",p+i);
	 }
	 printf("Array:\n");
	 for(i=0;i<n;i++)
	 {
	 	printf("%d\n",*(p+i));
	 }
	 int x,c=0;
	 printf("Enter the element to be searched \n");
	 scanf("%d",&x);
	 for(i=0;i<n;i++)
	 {
	 	if(*(p+i)==x)
	 	{
	 	printf("Found at %d\n",i+1);
		 c=1;
	 	break;
	 }
}
	 if(c==0)
	 {
	 	printf("Not found\n");
	 }
	 return 0;
}
