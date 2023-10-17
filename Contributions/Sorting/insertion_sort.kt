fun insertionSort(arr: IntArray) {
    for (i in 1 until arr.size) {
        val key = arr[i]
        var j = i - 1

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j]
            j--
        }
        arr[j + 1] = key
    }
}

fun main() {
    val arr = intArrayOf(12, 11, 13, 5, 6)
    
    println("Original array: ${arr.joinToString(", ")}")
    
    insertionSort(arr)
    
    println("Sorted array: ${arr.joinToString(", ")}")
}
