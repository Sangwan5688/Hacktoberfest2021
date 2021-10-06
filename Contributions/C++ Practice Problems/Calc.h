//
// Created by Anirudh Balasubramanian on 5/14/20.
//

#ifndef RHYMECALC_CALC_H
#define RHYMECALC_CALC_H


#include <string>

class Calc {
public:
    Calc(int val);
    Calc(const Calc &rhs);
    ~Calc();
    const Calc &operator=(const Calc &rhs);
    double process(std::string userInput, double prevValue);
    void print();
    std::string* storedExpressions;
    void setStored(size_t newStored);
    size_t getStored();
private:
    size_t stored;
};


#endif //RHYMECALC_CALC_H
