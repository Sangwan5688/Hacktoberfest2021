#include <iostream>

using namespace std;
class Room
{
    int cse;
    public :
    int ece;
    protected:
    int mec;
};
class Lectureroom : private Room
{
    private: 
    int x=0;
    public :
    int y=0;
    protected:
    int z=0;
};
int main()
{
    Lectureroom Lr1;
    Lr1.cse;
    return 0;
}
