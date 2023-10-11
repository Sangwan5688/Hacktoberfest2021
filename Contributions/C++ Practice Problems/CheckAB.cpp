#include <iostream>
using namespace std;

bool checker(char input[], int si)
{ // si = start index
    if (*(input + si) == NULL)
    {
        return true;
    }
    if (*(input + si) != 'a')
    {
        return false;
    }
    if (*(input + si + 1) == 'b' && *(input + si + 2) == 'b')
    {
        return checker(input, si + 3);
    }
    return checker(input, si + 1);
}

bool checkAB(char input[])
{
    bool ans;
    ans = checker(input, 0);
    return ans;
}

int main()
{
    char input[100];
    bool ans;
    cin >> input;
    ans = checkAB(input);
    if (ans)
        cout << "true" << endl;
    else
        cout << "false" << endl;
}
