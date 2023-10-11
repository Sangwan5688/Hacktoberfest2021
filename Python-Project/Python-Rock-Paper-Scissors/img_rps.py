import tkinter as tkinter
from PIL import ImageTk, Image
import time
import random


global label1, label2, button1, button2, path


def gui_rps():
    global label1, label2, button1, button2
    window = tkinter.Toplevel()
    window.title("r-p-s")
    window.geometry("500x500")
    window.geometry("+450+100")

    start(window)

    window.mainloop()


def start(window):

    l1 = ['rock.png', 'paper.png', 'scissors.png']
    path = random.choice(l1)

    label2 = tkinter.Label(window, text="Starting in 5",
                           font=("Times New Roman", 15, "bold"))
    label2.pack(pady=50)
    window.update()

    time.sleep(1)
    label2.configure(text="Starting in 4")
    window.update()

    time.sleep(1)
    label2.configure(text="Starting in 3")
    window.update()

    time.sleep(1)
    label2.configure(text="Starting in 2")
    window.update()

    time.sleep(1)
    label2.configure(text="Starting in 1")
    window.update()

    time.sleep(1)
    label2.pack_forget()
    window.update()

    img = ImageTk.PhotoImage(Image.open('rock.png'))
    panel = tkinter.Label(window, image=img)
    panel.pack(pady=50)

    window.update()
    time.sleep(0.7)

    img = ImageTk.PhotoImage(Image.open('paper.png'))
    panel.configure(image=img)

    window.update()
    time.sleep(0.7)

    img = ImageTk.PhotoImage(Image.open('scissors.png'))
    panel.configure(image=img)
    window.update()
    time.sleep(1)

    img = ImageTk.PhotoImage(Image.open(path))
    panel.configure(image=img)
    window.update()
    time.sleep(3)

    button2 = tkinter.Button(window, text="Restart",
                             font=("Times New Roman", 15, "bold"), command=lambda: restart(window))
    button2.pack(pady=40)
    window.update()


def restart(window):
    window.destroy()
    gui_rps()
