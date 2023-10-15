package main

import "math"

func minWindow(s string, t string) string {
	charCount := make(map[byte]int)
	for _, char := range t {
		charCount[byte(char)]++
	}

	left, minLen, minLenStart, count := 0, math.MaxInt32, 0, len(t)

	for right := 0; right < len(s); right++ {
		rightChar := s[right]
		if charCount[rightChar] > 0 {
			count--
		}
		charCount[rightChar]--

		for count == 0 {
			if right-left+1 < minLen {
				minLen = right - left + 1
				minLenStart = left
			}
			leftChar := s[left]
			charCount[leftChar]++
			if charCount[leftChar] > 0 {
				count++
			}
			left++
		}
	}

	if minLen == math.MaxInt32 {
		return ""
	}
	return s[minLenStart : minLenStart+minLen]
}
