#include <iostream>

using namespace std;

class Celsius
{
private:
    double value;

public:
    void setValue(double v)
    {
        value = v;
    }
    double toFahrenheit()
    {
        return (value * 1.8) + 32;
    }
};
class Fahrenheit
{
private:
    double value;

public:
    void setValue(double v)
    {
        value = v;
    }
    double toCelsius()
    {
        return (value - 32) / 1.8;
    }
};

void celsiusToFahrenheit()
{
    Celsius c;
    double temp;
    cout << "Enter value in Celsius:\t";
    cin >> temp;
    c.setValue(temp);
    cout << temp << " Celsius is " << c.toFahrenheit() << " Fahrenheit." <<  endl;
}
void fahrenheitToCelsius()
{
    Fahrenheit f;
    double temp;
      cout << "Enter value in Fahrenheit:\t";
    cin >> temp;
    f.setValue(temp);
    cout << temp << " Fahrenheit is " << f.toCelsius() << " Celsius." <<  endl;

}

int main()
{
    int choice;
    do
    {
        cout << "Enter your choice: " << endl;
        cout << "1. Celsius to Fahrenheit\t";
        cout << "2. Fahrenheit to Celsius\t";
        cout << "3. Exit" << endl;
        cin >> choice;
        switch (choice)
        {
        case 1:
            celsiusToFahrenheit();
            break;
        case 2:
            fahrenheitToCelsius();
            break;
        case 3:
            return 0;
        default:
        cout << "Invalid Choice" << endl;
            break;
        }
    } while (choice != 3);
    return 0;
}