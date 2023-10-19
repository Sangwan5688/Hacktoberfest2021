#include <iostream>
#include <vector>
#include <string>

class Employee {
public:
    int id;
    std::string name;
    double salary;

    Employee(int id, const std::string& name, double salary)
        : id(id), name(name), salary(salary) {}
};

class PayrollSystem {
public:
    std::vector<Employee> employees;

    void addEmployee(const Employee& employee) {
        employees.push_back(employee);
    }

    double calculateTotalPayroll() {
        double totalPayroll = 0.0;
        for (const Employee& employee : employees) {
            totalPayroll += employee.salary;
        }
        return totalPayroll;
    }
};

int main() {
    Employee employee1(1, "John Doe", 50000.0);
    Employee employee2(2, "Jane Smith", 60000.0);

    PayrollSystem payroll;
    payroll.addEmployee(employee1);
    payroll.addEmployee(employee2);

    std::cout << "Employee Payroll:\n";
    for (const Employee& employee : payroll.employees) {
        std::cout << employee.name << " - Salary: $" << employee.salary << std::endl;
    }

    std::cout << "Total Payroll: $" << payroll.calculateTotalPayroll() << std::endl;

    return 0;
}
