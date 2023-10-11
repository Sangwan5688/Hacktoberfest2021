#include<stdio.h>
#include<stdlib.h>

struct array{
    int *A;
    int size;
};

void BubbleSort(int B[],int size){
int count;
for(int i=0;i<size-1;i++){
    count=0;
    for(int j=0;j<size;j++){
    if (B[j]>B[j+1]){
        int temp;
        temp=B[j];
        B[j]=B[j+1];
        B[j+1]=temp;
        count=1;
    }
}
if(count==0){
    break;
}}}

int main(){
int B[]= {11,13,7,12,16,9,24,5,10,3,__INT32_MAX__};

BubbleSort(B,10); 

for (int i = 0; i < 10; i++)
{
    printf("%d ",B[i]);
}

return 0;

}