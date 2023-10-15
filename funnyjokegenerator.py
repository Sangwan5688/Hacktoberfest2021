import random

class JokeGenerator:
    def __init__(self):
        self.setups = ["Why did the computer go to therapy?", "What do you call a fish wearing a crown?", "Why did the scarecrow win an award?"]
        self.punchlines = ["It had too many bytes of emotional baggage!", "A kingfish!", "Because he was outstanding in his field!"]

    def generate_joke(self):
        selected_setup = random.choice(self.setups)
        selected_punchline = random.choice(self.punchlines)
        return f"{selected_setup} {selected_punchline}"

def main():
    joke_generator = JokeGenerator()
    joke = joke_generator.generate_joke()
    print(joke)

if __name__ == "__main__":
    main()
