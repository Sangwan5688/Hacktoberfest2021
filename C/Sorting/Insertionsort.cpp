#include<stdio.h>
void main()
{
  /* n=length of array
     a= name of array where it has static memory so here, we assume it can store number of elements upto 50.
     temp= it is a variable that will be used for temporary value during swapping of elements in array.
     min= it is a variable that is used to store the smallest element in array in every check. So that smaller element will come first during execution. */
  int n,a[50],temp,min;

  // input the length of array from user
  printf("enter number of elements= ");
  scanf("%d",&n);

  //input the elements of array from user
  printf("enter elements= ");
  for(int i=0;i<n;i++)
  {
    scanf("%d",&a[i]);
  }

  //Procedure to sort array in ascending order by selection sort
  for(int i=0;i<=n-2;i++)
  {
    min =i;
    for(int j=i+1;j<=n-1;j++)
    {
      if(a[j]<a[min])
      {
        min=j;
      }
    }
    temp= a[i];
    a[i]= a[min];
    a[min]= temp;
  }

//Now to print sorted array as an output
// "\n" is used for next line.
printf("After sorting \n");
for(int i=0;i<n;i++)
  {
    printf("%d",a[i]);
  }
}
