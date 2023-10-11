#include<bits/stdc++.h>
using namespace std;

int parent(int i){          //returns parent of a node
    return (int)(i-1)/2 ;
}
int left(int i) {           //returns left child of a node 
    return (2*i+1);} 
int right(int i) {          //returns right child of a node
    return (2*i+2) ;}
void swap(int* a , int* b){
    int t = *a ;
    *a = *b ;
    *b = t;
}

//function for forming a MAX HEAP from a given vector array

void heapify(vector<int> &arr , int n , int k){      
    int i = k ;
    while(i>=0){
        if ((left(i) > n-1)) {
            return ;
        }
        else if (right(i)<n){
            if(arr[i] < max(arr[left(i)] , arr[right(i)])) {
                if (max(arr[left(i)] , arr[right(i)])==arr[left(i)]){
                    swap(arr[left(i)] , arr[i] );
                    heapify(arr , n , left(i));
                }
                else {
                    swap(arr[right(i)] , arr[i] );
                    heapify(arr , n , right(i));
                } 
            }
        }
        else if ((right(i)>n-1)&&(left(i) < n)){
            if(arr[i] < arr[left(i)]){
                swap(arr[left(i)] , arr[i] ) ;
            }
        }
        i-- ;
    }
      
}


int main(){
    vector<int> array =  {1, 3, 5, 4, 6, 13, 10, 9, 8, 15, 17} ;
    int n = array.size() ;
    for (int i=n-1;i>=0; i--){
        heapify(array , n , i) ;
    }
    for (int i=0;i<n; i++){               
        cout<<array[i]<<" " ;
    }
   
}