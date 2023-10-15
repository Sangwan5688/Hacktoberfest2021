package main
import (
  "fmt" 
  "math/rand"
  "time"
  )

func main() {
fmt.Println("Game: The Computer Has Guessed A Number Between 0 to 10")
// This tells the player about how to play the game.
  fmt.Println("You Have Three Tries To Guess The Number.")

// This generates a random number to make the game unpredictable and fun
source := rand.NewSource(time.Now().UnixNano()) 

randomizer := rand.New(source)
secretNumber := randomizer.Intn(10) 

var guess int 

// To give the user 3 chances
for try := 1; try <= 3; try++ { 
fmt.Printf("TRIAL %d\n", try) 

fmt.Println("Please Enter Your Guessed Number : ")

// Asks user for the input.
fmt.Scan(&guess) 

// if the guessed number is less than or greater than the correct number then player is given the hint accordingly.
if guess < secretNumber { 
fmt.Printf("Sorry, It's A Wrong Guess ; The number is too Small\n")
} else if guess > secretNumber {
fmt.Printf("Sorry, It's A Wrong Guess ; The number is too Large\n")
} else {
fmt.Printf("Congratulations !!\nYou Guessed It Right. You win!\n") 
break
}

// If the user has exhausted the number of tries
if try == 3 { 

fmt.Printf("Sorry The Game Is Over!!\n")
fmt.Printf("The correct number was %d\n", secretNumber)
break
}
}
}
