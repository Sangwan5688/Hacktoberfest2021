package main

import (
	"flag"
	"fmt"
	"time"
)

func main() {
	n := flag.Int("n", 10, "Number of goroutines")
	flag.Parse()

	count := *n
	fmt.Printf("Going to create %d goroutines.\n", count)

	for i := 0; i < count; i++ {
		go func(x int) {
			fmt.Printf("%d", x)
		}(i)
	}
	// I am using time.Sleep here for the go routine to processed,
	// Note: For the better approach, I can use waitgroups here
	time.Sleep(time.Second)
	fmt.Println("\nExiting...")
}
