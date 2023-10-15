package main

func trap(height []int) int {
	n := len(height)
	left := 0
	right := n - 1
	leftMax := 0
	rightMax := 0
	result := 0

	for left < right {
		if height[left] < height[right] {
			if height[left] > leftMax {
				leftMax = height[left]
			} else {
				result += leftMax - height[left]
			}
			left++
		} else {
			if height[right] > rightMax {
				rightMax = height[right]
			} else {
				result += rightMax - height[right]
			}
			right--
		}
	}

	return result
}
