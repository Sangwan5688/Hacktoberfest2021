fun convert(s: String, numRows: Int): String {
    if (numRows == 1) return s

    val rows = Array(minOf(numRows, s.length)) { StringBuilder() }
    var currentRow = 0
    var goingDown = false

    for (char in s) {
        rows[currentRow].append(char)
        if (currentRow == 0 || currentRow == numRows - 1) {
            goingDown = !goingDown
        }
        currentRow += if (goingDown) 1 else -1
    }

    val result = StringBuilder()
    for (row in rows) {
        result.append(row)
    }
    return result.toString()
}

fun main() {
    val s = "PAYPALISHIRING"
    val numRows = 3
    println(convert(s, numRows)) 
}
