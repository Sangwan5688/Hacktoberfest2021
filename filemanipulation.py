# Reading from a file
with open('input.txt', 'r') as file:
    content = file.read()
    print("File Content:", content)

# Writing to a file
with open('output.txt', 'w') as file:
    file.write("Hello, this is a professional Python program.")
