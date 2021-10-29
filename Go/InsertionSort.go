package main

import "fmt"

func main() {
    var n = []int{1, 39, 2, 9, 7, 54, 11}

    var i = 1
    for i < len(n) {
        var j = i
        for j >= 1 && n[j] < n[j - 1] {
            n[j], n[j - 1] = n[j - 1], n[j]

            j--
        }

        i++
    }

    fmt.Println(n)
}
