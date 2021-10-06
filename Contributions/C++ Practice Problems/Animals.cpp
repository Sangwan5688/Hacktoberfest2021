/******************************************************************************

                              Online C++ Compiler.
               Code, Compile, Run and Debug C++ program online.
Write your code in this editor and press "Run" button to compile and execute it.

*******************************************************************************/

#include <iostream>
using namespace std;
class Animal
{
    
    public:
    void eat()
        {
            cout<<"carnivorus"<<endl;
            //cout<<"Herbivorus"<<endl;
        }
};
class pet_animal :public Animal
{
    public:
    void care()
    {
        cout<<"Giving food on time"<<endl;
    }
};
int main()
{
    pet_animal dog;
    dog.eat();
    dog.care();
    
    return 0;
}

