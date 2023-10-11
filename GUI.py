import tkinter as tk

def on_button_click():
    label.config(text="Hello, {}!".format(entry.get()))

# Create the main window
window = tk.Tk()
window.title("Professional Python App")

# Add widgets
label = tk.Label(window, text="Enter your name:")
entry = tk.Entry(window)
button = tk.Button(window, text="Greet", command=on_button_click)

# Pack widgets
label.pack(pady=10)
entry.pack(pady=10)
button.pack(pady=10)

# Start the main loop
window.mainloop()
