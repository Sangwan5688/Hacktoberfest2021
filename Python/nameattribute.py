from math import factorial as f
from random import choice as ch

nam = input() or "demiz"
name = nam.replace(" ", "")
if len(name) == 0:
    name = "demiz"
    nam = name

class Project:
    def __init__(self, n):
        self.n = n.lower()

    def length(self):
        return len(self.n)

    def vowels_consonants(self):
        vowels = list("aeiou")
        consonants = list("bcdfghjklmnpqrstvwxyz")
        count = 0
        con_count = 0
        for i in vowels:
            if i in self.n:
                count += self.n.count(i)
        for i in consonants:
            if i in self.n:
                con_count += self.n.count(i)
        return count, con_count

    def palindrome(self):
        if self.n == self.n[::-1]:
            return "a palindrome"
        return "not a palindrome"

    def passwd(self):
        dic = {"a":"@", "e":"£", "s":"$", "o":"0", "i":"!"}
        num = list(range(10))
        generated_pass = self.n
        for i in dic:
            if i in generated_pass:
                generated_pass = generated_pass.replace(i, dic[i])
            else:
                pass
        for i in range(5):
            generated_pass += str(ch(num))
        return generated_pass
        
    def permut(self):
        total_letters = f(len(self.n))
        d = {}
        new_value = 1
        for i in self.n:
            if self.n.count(i) >= 2:
                d[i] = self.n.count(i)
        for i in d:
            new_value *= f(d[i])
        return total_letters // new_value

d = Project(name)
vowel, consonant = d.vowels_consonants()


print(f"""Your name is {nam}, '{d.n.lower()}'
can be arranged in {d.permut()} ways, your name
has {d.length()} characters and consists of {vowel} vowel(s)
and {consonant} consonant(s), your name is {d.palindrome()},
and \'{d.passwd()}\' could be a suitable
password for you.""")
