

******************************************************************************************************************************************************************
/******************************************************************************

                              Online C++ Compiler.
               Code, Compile, Run and Debug C++ program online.
Write your code in this editor and press "Run" button to compile and execute it.

*******************************************************************************/

#include <iostream>
using namespace std;
class IBM_Company
{
    
    public:
    void problem()
        {
            cout<<"Fix the network problem at abc address"<<endl;
            //cout<<"Herbivorus"<<endl;
        }
};
class software_engineer :public IBM_Company
{
    public:
    void resolve_problem()
    {
        cout<<"Networking problem resolve on 18-08-2020"<<endl;
    }
};
int main()
{
    software_engineer se1;
    se1.problem();
    se1.resolve_problem();
    
    return 0;
}
