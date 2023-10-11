import tkinter as tkinter
import img_rps as Gui
import string_rps as Gui2

global label1, label2, button1, button2


def main():
    global label1, label2, button1, button2
    window = tkinter.Tk()
    window.title("r-p-s")
    window.geometry("500x500")
    window.geometry("+450+100")

    label1 = tkinter.Label(window, text="Image based",
                           font=("Times New Roman", 15, "bold"))
    label1.pack(pady=50)

    button1 = tkinter.Button(window, text="Play", font=(
        "Times New Roman", 13), command=gui)
    button1.pack(pady=10)

    label2 = tkinter.Label(window, text="String based",
                           font=("Times New Roman", 15, "bold"))
    label2.pack(pady=50)

    button2 = tkinter.Button(window, text="Play", font=("Times New Roman", 13),
                             command=gui2)
    button2.pack(pady=10)

    window.mainloop()


def gui():
    Gui.gui_rps()


def gui2():
    Gui2.s_rps()


main()
