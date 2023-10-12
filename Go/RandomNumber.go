package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	rand.Seed(time.Now().UnixNano())
	randomNumber := rand.Intn(10) + 1
	fmt.Printf("Random number: %d\n", randomNumber)
}
