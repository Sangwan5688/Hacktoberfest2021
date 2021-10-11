//There is a collection of input strings and a collection of query strings. For each query string, determine how many times it occurs in the list of input strings. Return an array of the results.

#include<stdio.h>
#include<string.h>
int main()
{
    char A[1000][20],B[20];
    int N,i,Q,ans;
    scanf("%d",&N);
    for(i=0;i<N;i++)
        scanf("%s",A[i]);
    scanf("%d",&Q);
    while(Q--)
    {
        ans=0;
        scanf("%s",B);
        for(i=0;i<N;i++)
        {
            if(strcmp(B,A[i])==0)
                ans++;
        }
        printf("%d\n",ans);
    }
    return 0;
}
