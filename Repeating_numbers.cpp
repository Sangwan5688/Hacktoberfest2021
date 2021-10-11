#include <iostream>
#include <map>

int main()
{
    int foo[]{1,1,1,1,4,6,4,7,4};
    std::map<int, int> bar;

    for (auto const &f : foo)
        bar[f]++;

    for (auto const &b : bar)
        std::cout << "The number " << b.first 
                  << " is repeated " << b.second 
                  << " times\n";
}