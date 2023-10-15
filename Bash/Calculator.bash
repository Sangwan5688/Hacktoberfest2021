#!/bin/bash

echo "Simple Calculator"
echo "Available operations: +, -, *, /"

# Read user input
read -p "Enter the first number: " num1
read -p "Enter the operator: " operator
read -p "Enter the second number: " num2

# Perform the calculation
case $operator in
  +)
    result=$(echo "$num1 + $num2" | bc)
    ;;
  -)
    result=$(echo "$num1 - $num2" | bc)
    ;;
  *)
    if [ "$operator" = "*" ]; then
      result=$(echo "$num1 * $num2" | bc)
    elif [ "$operator" = "/" ]; then
      result=$(echo "scale=2; $num1 / $num2" | bc)
    else
      echo "Invalid operator"
      exit 1
    fi
    ;;
esac

# Display the result
echo "Result: $num1 $operator $num2 = $result"
