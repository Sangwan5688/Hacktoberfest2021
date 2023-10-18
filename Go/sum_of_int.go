package main

import "fmt"

func main() {
    var n int
    fmt.Print("Enter a positive integer: ")
    fmt.Scan(&n)
    
    sum := 0
    for i := 1; i <= n; i++ {
        sum += i
    }
    
    fmt.Printf("The sum of integers from 1 to %d is: %d\n", n, sum)
}
