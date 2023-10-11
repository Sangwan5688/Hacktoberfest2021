class Question:
    def __init__(self, text, choices, correct_choice):
        self.text = text
        self.choices = choices
        self.correct_choice = correct_choice

    def is_correct(self, choice):
        return choice == self.correct_choice

class Quiz:
    def __init__(self):
        self.questions = []

    def add_question(self, text, choices, correct_choice):
        question = Question(text, choices, correct_choice)
        self.questions.append(question)
        print("Question added to the quiz.")

    def take_quiz(self):
        score = 0
        for question in self.questions:
            print(question.text)
            for i, choice in enumerate(question.choices, 1):
                print(f"{i}. {choice}")
            user_choice = int(input("Enter the number of your choice: "))
            if question.is_correct(user_choice):
                print("Correct!\n")
                score += 1
            else:
                print("Incorrect.\n")
        print(f"Your score: {score}/{len(self.questions)}")

def main():
    quiz = Quiz()

    while True:
        print("\nQuiz Game")
        print("1. Add Question to Quiz")
        print("2. Take Quiz")
        print("3. Quit")

        choice = input("Enter your choice: ")

        if choice == '1':
            text = input("Enter the question: ")
            choices = input("Enter the answer choices separated by commas: ").split(',')
            correct_choice = int(input("Enter the number of the correct choice: "))
            quiz.add_question(text, choices, correct_choice)
        elif choice == '2':
            quiz.take_quiz()
        elif choice == '3':
            print("Exiting the Quiz Game. Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
