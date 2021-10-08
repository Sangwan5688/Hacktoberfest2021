#include <stdio.h>
#include <stdlib.h>

int main() {
 int n,i;
 printf("Enter the number of elements \n");
 scanf("%d",&n);
 printf("Enter the elements\n");
 int a[n];
 int *p;
 p=&a[n];
 for(i=0;i<n;i++)
{
	scanf("%d",(p+i));
}
for(i=0;i<n;i++){
	printf("%d\n",*(p+i));
}
return 0;
}
