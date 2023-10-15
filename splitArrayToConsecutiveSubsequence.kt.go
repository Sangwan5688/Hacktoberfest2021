package main

func isPossible(nums []int) bool {
	freqMap := make(map[int]int)
	appendMap := make(map[int]int)

	for _, num := range nums {
		freqMap[num]++
	}

	for _, num := range nums {
		if freqMap[num] == 0 {
			continue
		} else if appendMap[num] > 0 {
			appendMap[num]--
			appendMap[num+1]++
		} else if freqMap[num+1] > 0 && freqMap[num+2] > 0 {
			freqMap[num+1]--
			freqMap[num+2]--
			appendMap[num+3]++
		} else {
			return false
		}
		freqMap[num]--
	}
	return true
}
