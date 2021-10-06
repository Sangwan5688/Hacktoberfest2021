#include <iostream>
#include "Calc.h"

int main() {
    int sentinal = 0;
    do {
        std::cout << "Please enter the number of expressions you would like to store: " << std::endl;
        int values;
        std::cin >> values;
        if (values < 1) {
            std::cout << "Error: Number of stored expressions must be positive" << std::endl;
        } else {
            Calc calc1 = Calc(values);
            for(size_t count = 0; count < values; count++){
                double answer = 0;
                bool flag = true;
                while(flag){
                    std::string userString;
                    std::cout << " Please enter your expression (Enter 'STOP' to halt this input stream): \n" << " = " << answer
                              << " + ... " << std::endl;
                    std::cin >> userString;
                    if (userString == "STOP") {
                        calc1.storedExpressions[calc1.getStored()] = std::to_string(answer);
                        flag = false;
                        break;
                    }
                    std::cout << userString << "= " << calc1.process(userString, answer);
                    answer = calc1.process(userString, answer);
                }
                calc1.setStored(calc1.getStored() + 1);
            }
            calc1.print();
            std::cout << "Press 1 to continue with another calculator, any other value to quit" << std::endl;
            std::cin >> sentinal;
        }
    }while(sentinal == 1);
    return 0;
}

