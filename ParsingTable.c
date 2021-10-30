#include<stdio.h>
#include<string.h>
#include<stdlib.h>
int num(char c)
{
  switch(c)
  {
    case'A':return 0;
    case'B':return 1;
    case'a':return 0;
    case'b':return 1;
    case'@':return 2;
  }
  return 1;
}

int main()
{
    char m[2][3][10] = {
        {"E\0","E\0","E\0"}, 
        {"E\0","E\0","E\0"}
    };
    char first[3][10] = {"a\0","b\0","@\0"}, follow[3][10] = {"$\0","a\0","a\0"};
    char LHS[3][3] = {"A\0","B\0","B\0"}, RHS[3][4] = {"aBa\0","bB\0","@\0"};
    char ip[100], stack[100];
    int size[2][3] = {3, 1, 1, 1, 2, 1}, p, q, r, i, j, n, k, row, col;

    printf("\nFirst={%c,%c,%c}", first[0][0], first[1][0], first[2][0]);
    printf("\nFollow={%c,%c}\n\n\n", follow[0][0], follow[1][0]);
    
    for(i=0;i<3;i++) {
    	if(first[i][0] != '@')
    	    strcpy(m[num(LHS[i][0])][num(first[i][0])], RHS[i]);
   	    else 
            strcpy(m[num(LHS[i][0])][num(follow[i][0])], RHS[i]);   		
    }

    printf("Enter string:\n");
    scanf("%s",ip);
    strcat(ip,"$");
    n = strlen(ip);
    stack[0]='$';
    stack[1]='A'; 
    i=1; j=0;

    printf("\nParsing Table : \n");
    for(p=0;p<2;p++) {
	    for(q=0;q<3;q++)
		    printf("%s\t",m[p][q]);
	    printf("\n");
    }

	printf("\nStack\tInput\n");
	for(k=0;k<=i;k++)
		printf("%c",stack[k]);
	printf("\t");
	for(k=j;k<=n;k++)
		printf("%c",ip[k]);
	printf("\n");
	
    while((stack[i]!='$') && (ip[j]!='$')) {
		if(stack[i]==ip[j]) {
			i--;
			j++;
			for(k=0;k<=i;k++)
				printf("%c",stack[k]);
			printf("\t");
			for(k=j;k<=n;k++)
				printf("%c",ip[k]);
			printf("\n");
		}

		switch(stack[i]) {
			case 'A': row=0;break;
			case 'B': row=1;break;
			default:
				if((stack[i]=='$')&&(ip[j]=='$'))
					printf("Successful Parsing\n");
				else
					printf("Rejected\n");
				exit(0);
		}

		switch(ip[j]) {
			case 'a': col=0; break;
			case 'b': col=1; break;
			case 'c': col=2; break;
		}

		if(m[row][col][0]==ip[j]) {
			for(k=size[row][col]-1;k>=0;k--) {
				stack[i]=m[row][col][k];
				i++;
			}
			i--;
		}

		if(m[row][col][0]=='E') {
			if(i>0)
			{
				printf("Error\n");
				exit(0);
			}
		}

		if(m[row][col][0]=='@')
			i--;

		for(k=0;k<=i;k++)
			printf("%c",stack[k]);
		printf("\t");
		for(k=j;k<=n;k++)
			printf("%c",ip[k]);
		printf("\n");
	} 
}
