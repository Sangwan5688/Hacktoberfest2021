import 'dart:io';

void main() {
  var questions = [
    "What is the capital of France?",
    "Which planet is known as the Red Planet?",
    "What is 2 + 2?",
  ];

  var answers = ["Paris", "Mars", "4"];

  print("Welcome to the Quiz Game!");
  var score = 0;

  for (var i = 0; i < questions.length; i++) {
    print("Question ${i + 1}: ${questions[i]}");
    stdout.write("Your answer: ");
    var userAnswer = stdin.readLineSync();

    if (userAnswer == answers[i]) {
      print("Correct!");
      score++;
    } else {
      print("Incorrect. The correct answer is: ${answers[i]}");
    }
  }

  print("Quiz completed! Your score: $score out of ${questions.length}");
}
