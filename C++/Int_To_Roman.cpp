#include <iostream>
#include<bits/stdc++.h>
using namespace std;

char rom(int i){
        switch(i){
           case 1: return 'I'; break;
            case 5: return 'V'; break;
            case 10: return 'X'; break;
            case 50: return 'L'; break;
            case 100: return 'C'; break;
            case 500: return 'D'; break;
            case 1000: return 'M'; break;
            default: return 'E'; break;
        }
        
        return 'E';
    }
    
int main()
{
    int num;
    cin>>num;

    string s="";
        int pos=1;
        while(num>0){
            int dig=num%10;
            string temp="";
            if(dig==9){
                temp+=rom(pos);
                temp+=rom(pos*10);
            }
            else if(dig==4){
                temp+=rom(pos);
                temp+=rom(pos*5);
            }
            else{
                if(dig>=5){
                    temp+=rom(5*pos);
                    dig-=5;
                }
                if(dig>0){
                    for(int i=0;i<dig;i++){
                        temp+=rom(pos);
                    }
                }
            }
            num=num/10;
            pos=pos*10;
            s.insert(0,temp);
        }
        cout<<"ROMAN"<<s;
		
    return 0;
}
