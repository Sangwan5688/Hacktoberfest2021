package main

func lengthOfLongestSubstring(s string) int {
	n := len(s)
	maxLength := 0
	charIndex := make([]int, 128)

	start := 0
	for end := 0; end < n; end++ {
		start = max(start, charIndex[int(s[end])])
		maxLength = max(maxLength, end-start+1)
		charIndex[int(s[end])] = end + 1
	}

	return maxLength
}
