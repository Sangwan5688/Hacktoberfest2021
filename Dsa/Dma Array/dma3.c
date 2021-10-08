#include <stdio.h>
#include <stdlib.h>
void delete(int *ptr,int n,int pos)
{
int i;
for(i=pos-1;i<n;i++)
*(ptr+i)=*(ptr+i+1);
}
int main() {
	int n,*p,i;
	printf("Enter the number of elements\n");
	scanf("%d",&n);
	p=(int *)malloc(n * sizeof(int));
    printf("Enter the elements\n");
    for(i=0;i<n;i++)
    scanf("%d",p+i);
    printf("Original array\n");
    for(i=0;i<n;i++)
    printf("%d\n",*(p+i));
    int pos;
    printf("Enter the position from which we need to delete the element\n");
    scanf("%d",&pos);
    delete(p,n,pos);
    n=n-1;
    printf("New array\n");
    for(i=0;i<n;i++)
    printf("%d\n",*(p+i));
	return 0;
}
