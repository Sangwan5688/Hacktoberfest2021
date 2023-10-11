#include<iostream>  
  
using namespace std;  
  
void selection(int a[], int n)  
{  
    int i, j, small;  
      
    for (i = 0; i < n-1; i++)    
    {  
        small = i;   
          
        for (j = i+1; j < n; j++)  
        if (a[j] < a[small])  
            small = j;  
 
    int temp = a[small];  
    a[small] = a[i];  
    a[i] = temp;  
    }  
}  
  
void printArr(int a[], int n)  
{  
    int i;  
    for (i = 0; i < n; i++)  
        cout<< a[i] <<" ";  
}  
  
int main()  
{  
    int a[] = { 100, 10, 20, 30, 50, 40, 90, 80, 70, 60 };  
    int n = sizeof(a) / sizeof(a[0]);  
    cout<< "Before sorting array elements are - "<<endl;  
    printArr(a, n);  
    selection(a, n);  
    cout<< "\nAfter sorting array elements are - "<<endl;    
    printArr(a, n);  
  
    return 0;  
}    
