/**
 * Given two binary strings, return their sum (also a binary string).
 *
 * For example,
 * a = "11"
 * b = "1"
 * Return "100".
 */

class Solution_add_binary {

    // T:O(n) S:O(1)
    fun addBinary(a: String, b: String): String {
        var i: Int = 0
        var j: Int = 0
        val sb = StringBuilder()
        var carry = 0
        var temp: Int
        while (i < a.length || j < b.length) {
            temp = carry
            if (i < a.length) {
                temp += Integer.parseInt(a[a.length - 1 - i].toString())
                i++
            }
            if (j < b.length) {
                temp += Integer.parseInt(b[b.length - 1 - j].toString())
                j++
            }
            sb.append(temp % 2)
            carry = temp / 2
        }
        if (carry > 0)
            sb.append(carry)

        return sb.toString().reversed()
    }
}

fun main(args: Array<String>) {
    val s = Solution_add_binary()
    println(s.addBinary("11", "1"))
}
