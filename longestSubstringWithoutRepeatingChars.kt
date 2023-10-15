fun lengthOfLongestSubstring(s: String): Int {
    val n = s.length
    var maxLength = 0
    val charIndex = IntArray(128)

    var start = 0
    for (end in 0 until n) {
        start = maxOf(start, charIndex[s[end].toInt()])
        maxLength = maxOf(maxLength, end - start + 1)
        charIndex[s[end].toInt()] = end + 1
    }

    return maxLength
}