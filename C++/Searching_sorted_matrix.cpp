#include <iostream>
#include <vector>

void searchN(std::vector<std::vector<int>> v, int n){
    int startPos = 0;
    int i=0,j=v[0].size()-1;

    while(i < v.size() && j >= 0){

        std::cout << i << " " << j << " " << v[i][j] << '\n';

        if(v[i][j]==n){
            std::cout << "Found at : " << i+1 << ", " << j+1 << '\n';
            return;
        }
        if(v[i][j] < n){
            i++;
        } else {
            j--;
        } 
    }

    std::cout << "NOT FOUND" << '\n';
    return;
}

int main(){
    std::vector<std::vector<int>> v = {{1,4,7,11},{8,9,10,20},{11,12,17,30}};
    searchN(v,10);
}
