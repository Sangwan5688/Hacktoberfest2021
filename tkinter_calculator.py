import tkinter as tk
import math

class Calculator:
    def __init__(self, master):
        self.master = master
        self.master.title("Calculator")

        # Create entry widget
        self.entry = tk.Entry(self.master, width=25, justify="right")
        self.entry.grid(row=0, column=0, columnspan=4, padx=10, pady=10)

        # Create buttons for numbers
        self.buttons = []
        for i in range(10):
            button = tk.Button(self.master, text=str(i), width=5, command=lambda x=i: self.button_click(str(x)))
            self.buttons.append(button)

        # Place number buttons in grid
        for i in range(1, 10):
            row = 3 - (i - 1) // 3
            col = (i - 1) % 3
            self.buttons[i].grid(row=row, column=col, padx=5, pady=5)
        self.buttons[0].grid(row=4, column=0, padx=5, pady=5)

        # Create operator buttons
        self.add_button = tk.Button(self.master, text="+", width=5, command=lambda: self.operator_click("+"))
        self.add_button.grid(row=1, column=3, padx=5, pady=5)
        self.sub_button = tk.Button(self.master, text="-", width=5, command=lambda: self.operator_click("-"))
        self.sub_button.grid(row=2, column=3, padx=5, pady=5)
        self.mul_button = tk.Button(self.master, text="*", width=5, command=lambda: self.operator_click("*"))
        self.mul_button.grid(row=3, column=3, padx=5, pady=5)
        self.div_button = tk.Button(self.master, text="/", width=5, command=lambda: self.operator_click("/"))
        self.div_button.grid(row=4, column=3, padx=5, pady=5)

        # Create clear button
        self.clear_button = tk.Button(self.master, text="C", width=5, command=self.clear)
        self.clear_button.grid(row=4, column=1, padx=5, pady=5)

        # Create equal button
        self.equal_button = tk.Button(self.master, text="=", width=5, command=self.calculate)
        self.equal_button.grid(row=4, column=2, padx=5, pady=5)

        self.expression = ""

    def button_click(self, number):
        self.expression += number
        self.entry.delete(0, tk.END)
        self.entry.insert(0, self.expression)

    def operator_click(self, operator):
        if self.expression != "" and self.expression[-1].isdigit():
            self.expression += operator
            self.entry.delete(0, tk.END)
            self.entry.insert(0, self.expression)

    def clear(self):
        self.expression = ""
        self.entry.delete(0, tk.END)

    def calculate(self):
        if self.expression != "" and self.expression[-1].isdigit():
            try:
                result = eval(self.expression)
                self.entry.delete(0, tk.END)
                self.entry.insert(0, result)
                self.expression = str(result)
            except:
                self.entry.delete(0, tk.END)
                self.entry.insert(0, "Error")
                self.expression = ""

root = tk.Tk()
calc = Calculator(root)
root.mainloop()
