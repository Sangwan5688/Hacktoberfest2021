def is_palindrome(word):
    return word == word[::-1]

def find_palindromic_words(sentence):
    words = sentence.split()
    palindromic_words = [word for word in words if is_palindrome(word)]
    return palindromic_words

# Example usage:
sentence = "racecar level madam hello world"
palindromic_words = find_palindromic_words(sentence)
print("Palindromic words:", palindromic_words)
