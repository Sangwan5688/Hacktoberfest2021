fun bSort(arr:IntArray):IntArray{
    var swap = true
    while(swap){
        swap = false
        for(i in 0 until arr.size-1){
            if(arr[i] > arr[i+1]){
                val temp = arr[i]
                arr[i] = arr[i+1]
                arr[i + 1] = temp
                swap = true
            }
        }
    }
    return arr
}


fun main(args: Array<String>) {
    val list = bSort(intArrayOf(2,12,3,9,4))
    for (i in list) print("$i ")
}
