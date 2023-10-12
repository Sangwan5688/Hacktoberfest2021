notes = []

def add_note():
    note = input("Enter your note: ")
    notes.append(note)
    print("Note added successfully.")

def list_notes():
    if not notes:
        print("No notes found.")
    else:
        print("Your notes:")
        for i, note in enumerate(notes):
            print(f"{i+1}. {note}")

while True:
    print("\nOptions:")
    print("1. Add a note")
    print("2. List notes")
    print("3. Quit")

    choice = input("Enter your choice: ")

    if choice == "1":
        add_note()
    elif choice == "2":
        list_notes()
    elif choice == "3":
        print("Exiting the Note-taking App.")
        break
    else:
        print("Invalid choice. Please try again.")
