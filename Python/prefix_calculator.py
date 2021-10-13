from enum import Enum
import math

OPERATORS = {  
    "+": "add",
    "-": "subtract",
    "*": "multiply",
    "/": "divide",
    "^": "negation"
}

PRECEDENCE = {
    "+": 0,
    "-": 0,
    "*": 1,
    "/": 1,
    "^": 2
}

class Type(Enum):  # This could also be done with individual classes
    leftparentheses = 0
    rightparentheses = 1
    operator = 2
    empty = 3
    operand = 4

def typeof(string):
    if string == '(':
        return Type.leftparentheses
    elif string == ')':
        return Type.rightparentheses
    elif string in OPERATORS:
        return Type.operator
    elif string == ' ':
        return Type.empty
    else:
        return Type.operand

def get_infix():
    infix = input('Enter valid infix expression: ')
    return infix

def find_tokens(infix):
    tokens = []
    l = len(infix)
    i = 0
    while i < l:
        if typeof(infix[i]).value == 3:
            i += 1
            continue
        elif typeof(infix[i]).value == 4:
            digit = ''
            digit += infix[i]
            j = i+1
            try:
                while typeof(infix[j]).value == 4:
                    digit += infix[j]
                    j += 1
            except(IndexError):
                pass
            tokens.append(digit)
            i += (j-i)
        else:
            tokens.append(infix[i])
            i += 1 
    return tokens

def find_negation(tokens):
    for i in range(len(tokens)):
        if tokens[i] == '-':
            if i == 0:
                tokens[i] = '^'
            if tokens[i-1] in OPERATORS:
                tokens[i] = '^'
            if tokens[i-1] == '(':
                tokens[i] = '^'
    return tokens
            

def reverse_infix(infix):
    rev = []
    tokens = find_negation(find_tokens(infix))
    for token in tokens[::-1]:
        rev.append(token)
    return rev

def infix_to_prefix(infix):
    inp = reverse_infix(infix)
    stack = []
    prefix = ''
    prefix_tokens = []
    #breakpoint()
    for token in inp:
        if typeof(token).value == 4:
            prefix += token + ' '
            prefix_tokens.append(int(token))
        elif typeof(token).value == 1:
            stack.append(token)
        elif typeof(token).value == 0:
            while typeof(stack[-1]).value != 1:
                item = stack.pop()
                prefix += item + ' '
                prefix_tokens.append(item)
            stack.pop()
        elif typeof(token).value == 2:
            while True:
                if stack == [] or stack[-1] == '(' or stack[-1] == ')' or PRECEDENCE[token] >= PRECEDENCE[stack[-1]]:
                    stack.append(token)
                    break
                else:
                    item = stack.pop()
                    prefix += item + ' '
                    prefix_tokens.append(item)
    while stack != []:
        item = stack.pop()
        prefix += item + ' '
        prefix_tokens.append(item)
    prefix = prefix[::-1]
    prefix_tokens = list(reversed(prefix_tokens))
    print('Prefix Expression: {}'.format(prefix))
    return prefix_tokens

def calculate(infix):
    prefix = infix_to_prefix(infix)
    p = len(prefix) - 1
    stack = []
    while p >= 0:
        curr = prefix[p]
        if typeof(curr).value == 4:
            stack.append(curr)
        elif curr == '^':
            op = stack.pop()
            op = -op
            stack.append(op)
        else:
            op1 = stack.pop()
            op2 = stack.pop()
            if curr == '+':
                res = op1 + op2
                stack.append(res)
            if curr == '-':
                res = op1 - op2
                stack.append(res)
            if curr == '*':
                res = op1*op2
                stack.append(res)
            if curr == '/':
                res = math.ceil(op1/op2)
        p -= 1
    res = stack[-1]
    if res < -128 or res > 127:
        print('Overflow occurred')
    print('Result: {}'.format(res))
    return stack[-1]
