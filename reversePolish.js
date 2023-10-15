function evalRPN(tokens) {
    const stack = [];

    for (const token of tokens) {
        if (token === "+" || token === "-" || token === "*" || token === "/") {
            const operand2 = stack.pop();
            const operand1 = stack.pop();
            switch (token) {
                case "+":
                    stack.push(operand1 + operand2);
                    break;
                case "-":
                    stack.push(operand1 - operand2);
                    break;
                case "*":
                    stack.push(operand1 * operand2);
                    break;
                case "/":
                    stack.push(Math.trunc(operand1 / operand2));
                    break;
            }
        } else {
            stack.push(Number(token));
        }
    }

    return stack[0];
}

const tokens = ["2", "1", "+", "3", "*"];
console.log(evalRPN(tokens)); // Output: 9
