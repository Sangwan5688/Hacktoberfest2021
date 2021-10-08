#include <stdio.h>
#include <stdlib.h>
void add(int **b,int **c,int n,int o,int p)
{
    int st[10][3];
    st[0][0]=p;
    st[0][1]=o;
    int l,i,k,j,count;
    count=0;
    for(i=0;i<k;i++)
    {
        if(b[i][0]<c[i][0])
        {
            st[i][0]=b[i][0];
            st[i][1]=b[i][1];
            st[i][2]=b[i][2];
            count++;

        }
        else if(b[i][0]>c[i][0])
        {
              st[i][0]=c[i][0];
            st[i][1]=c[i][1];
            st[i][2]=c[i][2];
            count++;

        }
        else
        {
            if (b[i][1]<c[i][1])
            { st[i][0]=b[i][0];
            st[i][1]=b[i][1];
            st[i][2]=b[i][2];
            count++;
            }
            else if(b[i][1]>c[i][1])
            {
                    st[i][0]=c[i][0];
            st[i][1]=c[i][1];
            st[i][2]=c[i][2];
            count++;
            }
            else
            {
                    st[i][0]=c[i][0];
            st[i][1]=c[i][1];
            st[i][2]=b[i][2]+c[i][2];
            count++;
            }
        }
    }
    st[0][2]=count;
printf("the addition is\n");
    for(i=0;i<count;i++)
    {
        for(j=0;j<3;j++)
        {
            printf("%d\t",st[i][j]);
        }
        printf("\n");
    }

}
int main()
{int **p,**q;
int m,n,i,j;
printf("enter the number of rows and columns\n");
scanf("%d%d",&n,&m);
p=(int **)malloc(n*sizeof(int *));
for(i=0;i<n;i++)
{
    p[i]=(int *)malloc(m*sizeof(int));

}
printf("enter the elements\n");
for(i=0;i<n;i++)
{
    for(j=0;j<m;j++)
    {
        scanf("%d",&p[i][j]);
    }
}
printf("the sparse matrix is\n");
for(i=0;i<n;i++)
{
    for(j=0;j<m;j++)
    {
        printf("%d\t",p[i][j]);
    }
    printf("\n");
}
int b[10][3];
int k=1;
b[0][0]=n;
b[0][1]=m;
int c=0;
k=1;
for(i=0;i<n;i++)
{
    for(j=0;j<m;j++)
    {
        if(p[i][j]!=0)
        {
            b[k][0]=i;
            b[k][1]=j;
            b[k][2]=p[i][j];
            k++;
            c++;
        }
    }
}

    b[0][2]=c;
    printf("the triplet form is\n");
    for(i=0;i<k;i++)
    {
        for(j=0;j<3;j++)
        {
            printf("%d\t",b[i][j]);
        }
        printf("\n");
    }
    int d[10][3];

    for(i=0;i<k;i++)
    {
        d[i][0]=b[i][1];
        d[i][1]=b[i][0];
        d[i][2]=b[i][2];

    }

printf("the triplet for transpose is\n");
for(i=0;i<k;i++)
{
    for(j=0;j<3;j++)
    {
        printf("%d\t",d[i][j]);
    }
    printf("\n");
}
if(b[0][0]!=d[0][0]||b[0][1]!=d[0][1])
{
    printf("addition not possible\n");
    exit(0);
}
add(b,d,k,m,n);


    return 0;
}