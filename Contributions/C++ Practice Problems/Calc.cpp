//
// Created by Anirudh Balasubramanian on 5/14/20.
//

#include <iostream>
#include "Calc.h"
#include "stddef.h"
#include <cmath>

Calc::Calc(int values):storedExpressions(new std::string[values]), stored(0){
}

Calc::Calc(const Calc &rhs) {
    if(storedExpressions != nullptr){
        storedExpressions = new std::string[rhs.stored];
    }
}

Calc::~Calc() {
    delete[] storedExpressions;
    storedExpressions = nullptr;
    stored = 0;
}

const Calc &Calc::operator=(const Calc &rhs) {
    if(this != &rhs){
        Calc temp(rhs);
        std::swap(storedExpressions, temp.storedExpressions);
        std::swap(stored, temp.stored);
    }
    return *this;
}

double Calc::process(std::string userInput, double prevValue) {
    //First cleanse
    std::string cleansedString = "";
    for(size_t i = 0; i < userInput.size(); ++i) {
        if (userInput[i] == '=' || userInput[i] == ' ' || userInput[i] == '(' || userInput[i] == ')') {}
        else {
            cleansedString += userInput[i];
        }
    }
    double value = std::stod(cleansedString.substr(1, cleansedString.length() - 1));
    if(cleansedString[0] == '^'){
        return pow(prevValue, value);
    }
    else if(cleansedString[0] == '*' || cleansedString[0] == '/'){
        if(cleansedString[0] == '*'){
            return prevValue * value;
        }
        else{
            if(value != 0){
                std::exit(0);
            }
        }
    }
    else if(cleansedString[0] == '+' || cleansedString[0] == '-'){
        if(cleansedString[0] == '+'){
            return prevValue + value;
        }
        else{
            return prevValue - value;
        }
    }
    else{
        std::cout << "ERROR: Must start with operator " << std::endl;
        return -10000000;
    }
    return -10000000;
}

void Calc::print() {
    std::cout << "You have " << stored << " expressions stored: ";
    for(size_t i = 0; i < stored; ++i){
        std::cout << "Expression " << i+1 << " result is:\n";
        std::cout << storedExpressions[i] << std::endl;
    }
}


void Calc::setStored(size_t newStored) {
    stored = newStored;
}

size_t Calc::getStored() {
    return stored;
}

