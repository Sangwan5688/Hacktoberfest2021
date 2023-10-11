#include<stdio.h>

int n;

int split(int Arr[],int lower,int upper);

void Quick_Sort(int Arr[],int lower,int upper)
{
	int i;
	if(upper>lower)
	{
	   i=split(Arr,lower,upper);

	   Quick_Sort(Arr,lower,i-1);
	   Quick_Sort(Arr,i+1,upper);
	}
}

int split(int Arr[],int lower,int upper)
{
	int i,x,y,t,k,flag=0;
	x=lower+1;
	y=upper;
	i=Arr[lower];
	while(y>=x)
	{
		while(Arr[x]<i)
		    x++;
		while(Arr[y]>i)
		    y--;
		if(y>x)
		{
			t=Arr[x];
			Arr[x]=Arr[y];
			Arr[y]=t;
		}
    }
	 t=Arr[lower];
	 Arr[lower]=Arr[y];
	 Arr[y]=t;
	 /*flag++;
     printf("\nThe array after iteration %d is: ",flag);
     for(k=0;k<n;k++)
	      printf(" %d",Arr[k]);*/
     return y;

}

int main()
{
	int Array[100],i;

	printf("Enter the size of the array: ");
	scanf("%d",&n);

	printf("\nEnter the array elements: ");
	for(i=0;i<n;i++)
	{
		scanf("%d",&Array[i]);
	}

	printf("\nThe original array is:  ");
	for(i=0;i<n;i++)
	{
		printf(" %d",Array[i]);
	}

	Quick_Sort(Array,0,n-1);

	printf("\nThe sorted array after sorting using Quick Sort method is: ");
	for(i=0;i<n;i++)
	{
	printf(" %d",Array[i]);
    }
    return 0;
}
