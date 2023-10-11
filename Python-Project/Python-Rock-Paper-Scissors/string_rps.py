import tkinter as tkinter
import random
from tkinter import messagebox

global choice, e1, winner


def s_rps():

    global choice, e1

    window = tkinter.Tk()
    window.title("r-p-s")
    window.geometry("500x500")
    window.geometry("+450+100")

    label1 = tkinter.Label(window, text="Enter choice",
                           font=("Times New Roman", 13, "bold"))
    label1.grid(row=1, column=1, pady=30, padx=70)

    e1 = tkinter.Entry(window, font=("Times New Roman", 13, "bold"))
    e1.grid(row=1, column=2, pady=30, padx=10)

    label2 = tkinter.Label(window, text="Choose between: rock, paper, scissors",
                           font=("Times New Roman", 13, "bold"))
    label2.grid(row=2, column=1, columnspan=3, pady=30, padx=30)

    b1 = tkinter.Button(window,  font=(
        "Times New Roman", 13, "bold"), text="Submit", width=20, command=lambda: p(window))
    b1.grid(row=3, column=1, columnspan=3, pady=5, padx=20)

    window.mainloop()


def p(window):
    global choice, e1, winner

    l1 = ['rock', 'paper', 'scissors']
    computerc = random.choice(l1)

    choice = e1.get()
    choice = choice.lower()
    print(choice+" vs "+computerc)

    if computerc == choice:
        print("tie")
        winner = "t"
    elif computerc == 'rock' and choice == 'scissors':
        print("loose")
        winner = "l"
    elif computerc == 'rock' and choice == 'paper':
        print("win")
        winner = "w"
    elif computerc == 'paper' and choice == 'scissors':
        print("win")
        winner = "w"
    elif computerc == 'paper' and choice == 'rock':
        print("loose")
        winner = "l"
    elif computerc == 'scissors' and choice == 'paper':
        print("loose")
        winner = "l"
    elif computerc == 'scissors' and choice == 'rock':
        print("win")
        winner = "w"

    if winner == "w":
        tkinter.messagebox.showinfo(
            message="You Won"+'\n'+choice+" vs "+computerc)
    elif winner == "l":
        tkinter.messagebox.showwarning(
            message="You Lost"+'\n'+choice+" vs "+computerc)
    elif winner == "t":
        tkinter.messagebox.showwarning(
            message="Its a Tie"+'\n'+choice+" vs "+computerc)



