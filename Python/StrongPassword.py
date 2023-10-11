import string
import secrets

def generate_strong_password(length=12):
    characters = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(secrets.choice(characters) for _ in range(length))
    return password

if __name__ == "__main__":
    password = generate_strong_password()
    print("Generated Password:", password)
