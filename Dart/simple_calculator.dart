import 'dart:io';

void main() {
  print("Simple Calculator");
  print("Enter the first number: ");
  double num1 = double.parse(stdin.readLineSync()!);

  print("Enter the second number: ");
  double num2 = double.parse(stdin.readLineSync()!);

  print("Select an operation (+, -, *, /): ");
  String operation = stdin.readLineSync()!;

  double result;

  switch (operation) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      if (num2 != 0) {
        result = num1 / num2;
      } else {
        print("Error: Division by zero.");
        return;
      }
      break;
    default:
      print("Invalid operation.");
      return;
  }

  print("Result: $num1 $operation $num2 = $result");
}
