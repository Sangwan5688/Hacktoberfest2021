#include <stdio.h>
#include <stdlib.h>
void merge(int *p,int *pt,int *ptr,int n,int m,int j)
{
int i,k;
for(i=0;i<n;i++)
*(ptr+i)=*(p+i);

for(i=0,k=n;k<j && i<m;i++,k++)
*(ptr+k)=*(pt+i);

//Array1
printf("Array 1\n");
for(i=0;i<n;i++)
printf("%d\n",*(p+i));
//Array2
printf("Array 2\n");
for(i=0;i<m;i++)
printf("%d\n",*(pt+i));
//Merged array
printf("Merged array\n");
for(i=0;i<j;i++)
printf("%d\n",*(ptr+i));
	
}
int main() {
int n,m,i,j,k,*p,*pt,*ptr;
printf("Enter the number of elements for array 1\n");
scanf("%d",&n);
printf("Enter the number of elements for array 2\n");
scanf("%d",&m);
p=(int *)malloc(n*sizeof(int));
pt=(int *)malloc(m*sizeof(int));
ptr=(int *)malloc((n+m)*sizeof(int));
printf("Enter the elements for array 1\n");
for(i=0;i<n;i++)
scanf("%d",p+i);
printf("Enter the elements for array 2\n");
for(i=0;i<n;i++)
scanf("%d",pt+i);	
j=m+n;
merge(p,pt,ptr,n,m,j);
return 0;
}
