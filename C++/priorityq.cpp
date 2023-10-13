#include <bits/stdc++.h>

#define ll long long int
#define F first
#define S second
#define pb push_back
#define all(p) p.begin(), p.end()
#define bug(...) __f(#__VA_ARGS__, __VA_ARGS__)

using namespace std;

template <typename Arg1>
void __f(const char *name, Arg1 &&arg1)
{
    cout << name << " : " << arg1 << endl;
}
template <typename Arg1, typename... Args>
void __f(const char *names, Arg1 &&arg1, Args &&...args)
{
    const char *comma = strchr(names + 1, ',');
    cout.write(names, comma - names) << " : " << arg1 << " | ";
    __f(comma + 1, args...);
}
////////////////////////////////////////////////////////////////

int main()
{
    int arr[] = {10, 15, 20, 45, 1, 54};
    priority_queue<int, vector<int>, greater<int>> heap;

    for (auto ell : arr)
    {
        heap.push(ell);
    }
    while (!heap.empty())
    {
        /* code */
        cout << heap.top() << endl;
        heap.pop();
    }

    return 0;
}