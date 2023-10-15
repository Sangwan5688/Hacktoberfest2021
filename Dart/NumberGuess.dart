import 'dart:io';
import 'dart:math';

void main() {
  final random = Random();
  final targetNumber = random.nextInt(100) + 1;
  int attempts = 0;

  print('Welcome to the Number Guessing Game!');
  print('I have chosen a number between 1 and 100. Can you guess it?');

  while (true) {
    stdout.write('Enter your guess (1-100): ');
    final userGuess = int.tryParse(stdin.readLineSync()!);

    if (userGuess == null || userGuess < 1 || userGuess > 100) {
      print('Please enter a valid number between 1 and 100.');
      continue;
    }

    attempts++;

    if (userGuess < targetNumber) {
      print('Try a higher number.');
    } else if (userGuess > targetNumber) {
      print('Try a lower number.');
    } else {
      print('Congratulations! You guessed the number in $attempts attempts.');
      break;
    }
  }
}
