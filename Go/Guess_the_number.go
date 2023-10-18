package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	rand.Seed(time.Now().UnixNano())
	target := rand.Intn(100) + 1
	guess := 0
	attempts := 0

	fmt.Println("Welcome to the Guess the Number Game!")
	fmt.Println("I've selected a random number between 1 and 100.")
	
	for guess != target {
		fmt.Print("Your guess: ")
		fmt.Scan(&guess)
		attempts++
		
		if guess < target {
			fmt.Println("Too low! Try again.")
		} else if guess > target {
			fmt.Println("Too high! Try again.")
		} else {
			fmt.Printf("Congratulations! You've guessed the number %d in %d attempts.\n", target, attempts)
		}
	}
}
