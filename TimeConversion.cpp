#include <bits/stdc++.h>

using namespace std;

int main()

{
    string time, final;
    int chour;
    cin >> time;

    string twodig = time.substr(0, 2);

    int hour = stoi(twodig);

    if (hour != 12)
    {
        if (time[8] != 'A')
        {
            chour = hour + 12;
            final = to_string(chour);
            time.replace(0, 2, final);
            time.resize(8);
            cout << time;
        }

        else
        {
            time.resize(8);
            cout << time;
        }
    }
    else if (hour = 12)
    {
        if (time[8] != 'A')
        {
            time.resize(8);
            cout << time;
        }
        else if (time[8] = 'A')
        {
            string zero = "00";
            // final = to_string(zero);
            time.replace(0, 2, zero);
            time.resize(8);
            cout << time;
        }
    }

    return 0;
}
