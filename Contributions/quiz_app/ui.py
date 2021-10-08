from tkinter import *
from quiz_brain import QuizBrain
from data import question_data
from question_model import Question
THEME_COLOR = "#375362"

question_bank = []
for question in question_data:
    question_text = question["question"]
    question_answer = question["correct_answer"]
    new_question = Question(question_text, question_answer)
    question_bank.append(new_question)

class QuizInterface():
    def __init__(self):
        self.window = Tk()
        self.window.title("Quizller")
        self.window.config(bg = THEME_COLOR, padx = 20, pady = 20)
        self.window.minsize(400, 400)
        self.score_label = Label(text = "Score: ", fg = "white", bg = THEME_COLOR)
        self.score_label.grid(row = 0, column = 1, padx = 30, pady = 20)
        self.canvas = Canvas(width = 300, height = 250, bg = "white")
        self.question_text = self.canvas.create_text(150, 125, text  = "", font = ("Arial", 20, "bold"),
                                                     fill = THEME_COLOR, width = 280)
        self.quiz_brain = QuizBrain(question_bank)
        self.canvas.grid(row = 1, column = 0, columnspan = 2)
        self.right_image = PhotoImage(file = "images/true.gif")
        self.wrong_image = PhotoImage(file = "images/false.gif")
        self.right_button = Button(image = self.right_image, command = self.true_pressed)
        self.wrong_button = Button(image = self.wrong_image, command = self.false_pressed)
        self.right_button.grid(row = 2, column = 0, padx = 20, pady = 20)
        self.wrong_button.grid(row = 2, column = 1, padx = 20, pady = 20)
        self.get_next_question()
        self.window.mainloop()

    def get_next_question(self):
        if self.quiz_brain.still_has_questions():
            self.canvas.config(bg = "white")
            self.score_label.config(text = f"Score: {self.quiz_brain.score}")
            self.q_text = self.quiz_brain.next_question()
            self.canvas.itemconfig(self.question_text, text = f"{self.q_text}")
        else:
            self.canvas.config(bg = "white")
            self.canvas.itemconfig(self.question_text, text = f"Congratulations, you completed the quiz. \n"
                                                              f"Your total score is {self.quiz_brain.score}/10")
            self.right_button.grid_forget()
            self.wrong_button.grid_forget()

    def true_pressed(self):
        is_right = self.quiz_brain.check_answer("true")
        self.give_feedback(is_right)

    def false_pressed(self):
        is_right = self.quiz_brain.check_answer("false")
        self.give_feedback(is_right)

    def give_feedback(self, is_right):
        if is_right:
            self.canvas.config(bg="green")
        else:
            self.canvas.config(bg="red")

        self.window.after(1000, self.get_next_question)


