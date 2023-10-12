import 'dart:io';

void main() {
  print("Simple Calculator");
  while (true) {
    stdout.write("Enter first number: ");
    double firstNumber = double.parse(stdin.readLineSync()!);

    stdout.write("Enter operator (+, -, *, /): ");
    String operator = stdin.readLineSync()!;

    stdout.write("Enter second number: ");
    double secondNumber = double.parse(stdin.readLineSync()!);

    double result = 0;

    switch (operator) {
      case "+":
        result = firstNumber + secondNumber;
        break;
      case "-":
        result = firstNumber - secondNumber;
        break;
      case "*":
        result = firstNumber * secondNumber;
        break;
      case "/":
        if (secondNumber != 0) {
          result = firstNumber / secondNumber;
        } else {
          print("Error: Division by zero");
          continue;
        }
        break;
      default:
        print("Invalid operator");
        continue;
    }

    print("Result: $firstNumber $operator $secondNumber = $result");

    stdout.write("Do you want to perform another calculation? (yes/no): ");
    String answer = stdin.readLineSync()!;
    if (answer.toLowerCase() != "yes") {
      break;
    }
  }
  print("Calculator closed.");
}
