def constructor(phrase):
    capitalized = phrase.capitalize()
    interrrogatives = ('how', 'when', 'why', 'which', 'what')
    if phrase.startswith(interrrogatives):
        return '{}?'.format(capitalized)
    else:
        return '{}.'.format(capitalized)


given = []

while True:
    user_input = input("Say something (Type end when done.): ")
    if user_input == 'end':
        break
    else:
        given.append(constructor(user_input))

print(' '.join(given))
