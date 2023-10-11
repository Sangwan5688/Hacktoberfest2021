package main

import (
	"fmt"
)

func main() {
	n := 10
	fmt.Printf("%v! = %v\n", n, factorial(n))
}

func factorial(n int) int {
	if n > 0 {
		return n * factorial(n-1)
	}
	return 1
}
