#include<bits/stdc++.h>
using namespace std;

int getLength(char name[])
{
    int count=0;
    for(int i=0;name[i]!='\0';i++)
    {
        count++;
    }
    
    // int i=0;
    // // while(name[i]!='\0')
    // // {
    // //     count++;
    // //     i++;
    // // }
    return count;
}

int main()
{
    char name[20];
    cout<<"enter your name : ";
    cin>>name;
    // // name[5] = '\0';
    // name[3] = '\0'; // stop at 3 index
    cout<<"your name is : "<<name<<endl;

    cout<<"Length of the char array is : "<<getLength(name);

    return 0;
}