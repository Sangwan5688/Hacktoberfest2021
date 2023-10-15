import java.util.Stack

fun evalRPN(tokens: Array<String>): Int {
    val stack = Stack<Int>()

    for (token in tokens) {
        if (token in setOf("+", "-", "*", "/")) {
            val operand2 = stack.pop()
            val operand1 = stack.pop()
            when (token) {
                "+" -> stack.push(operand1 + operand2)
                "-" -> stack.push(operand1 - operand2)
                "*" -> stack.push(operand1 * operand2)
                "/" -> stack.push(operand1 / operand2)
            }
        } else {
            stack.push(token.toInt())
        }
    }

    return stack.pop()
}
