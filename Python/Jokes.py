import pyjokes

def generate_joke(language="en"):
    joke = pyjokes.get_joke(language=language)
    return joke

if __name__ == "__main__":
    print("Joke Generator")
    while True:
        print("Choose an option:")
        print("1. Generate a Joke")
        print("2. Quit")
        choice = input("Enter your choice (1/2): ")

        if choice == "1":
            language = input("Enter the language (en, de, es, fr, or it): ")
            joke = generate_joke(language)
            print(joke)
        elif choice == "2":
            print("Exiting the Joke Generator. Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")
