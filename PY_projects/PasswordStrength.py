import re

def check_password_strength(password):
    if len(password) < 8:
        return "Weak: Password is too short."
    if not re.search(r'[a-z]', password):
        return "Weak: Password must contain lowercase letters."
    if not re.search(r'[A-Z]', password):
        return "Weak: Password must contain uppercase letters."
    if not re.search(r'[0-9]', password):
        return "Weak: Password must contain digits."
    if not re.search(r'[!@#$%^&*()_+]', password):
        return "Weak: Password must contain special characters."

    return "Strong: Password meets all criteria."

# Example usage:
password = "Strong@Passw0rd"
strength = check_password_strength(password)
print(strength)
