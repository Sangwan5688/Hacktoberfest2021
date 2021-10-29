package main

import "fmt"

func bubbleSort(arr []int, size int) []int {
    if size == 1 {
        return arr
    }

    var i = 0
    for i < size-1 {
        if arr[i] > arr[i+1] {
            arr[i], arr[i+1] = arr[i+1], arr[i]
        }

        i++
    }

    bubbleSort(arr, size - 1)

    return arr
}

func main() {
    var n = []int{1, 39, 2, 9, 7, 54, 11}

    fmt.Println(bubbleSort(n, len(n)))
}
