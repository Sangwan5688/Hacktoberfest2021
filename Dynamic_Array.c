#include<stdio.h>
main()
{
	int i,j,n,a[100],choice,ele,pos;
	
	printf("How many Elements You Enter : ");
	scanf("%d",&n);
	
	for(i=0; i<n; i++)
	{
		scanf("%d",&a[i]);
	}
	
	
	do
	{
		printf("\n\nPress 1 for Insert Array\nPress 2 for Delete Array\nPress 3 for Update Array\nPress 4 for Print Array\nPress 0 for Exit\n\n");
    	scanf("%d",&choice);
		
		switch(choice)
		{
			case 1 : 
			  	    printf("Enter Elements : ");
				    scanf("%d",&ele);
	
					printf("Enter Position : ");
					scanf("%d",&pos);
	
	              if(pos<=n)
				  {
					for(i=n-1; i>=pos-1; i--)
					{
						a[i+1] = a[i];
					}
	
					a[pos-1] = ele;
					n++;
					}
			        else
			        {
			        	printf("\nEnter Valid Position ..\n");
					}
			         
					break;
					
			case 2 : printf("Enter Position : ");
					 scanf("%d",&pos);
	
	                if(pos<=n)
	                {
	                	for(i=pos-1; i<n; i++)
						{
							a[i] = a[i+1];
						}	
						n--;
					}
					else
					{
						printf("\nEnter Valid Position ..\n");
					}
					
					break;
					
			case 3 : printf("Enter Position : ");
					 scanf("%d",&pos);
	
					 printf("Enter Elements : ");
	 				 scanf("%d",&ele);
	
	                if(pos<=n)
	                {
	                	a[pos-1] = ele;
					}
   					else
					{
						printf("\nEnter Valid Position ..\n");
					} 				
		
		    case 4 : for(i=0; i<n; i++)
				   	 {
						printf("%d ",a[i]);
	                 }	
	                 
	                 break;
		
		
	}
	
	
	}while(choice != 0);
	
}
