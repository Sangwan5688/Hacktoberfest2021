import java.util.*
import kotlin.collections.ArrayList

fun main() {
    val input = Scanner(System.`in`)
    print("Sum of Tribonacci number : ")
    val number = input.nextInt()
    val arrayList = ArrayList<Int>()
    var i = 0
    while (i <= number) {
        var count = 0
        if (i in 1..3) {
            count = 1
        } else if (i >= 4) {
            count = arrayList[i - 3] + arrayList[i - 2] + arrayList[i - 1]
        }
        arrayList.add(count)
        i++
    }
    arrayList.removeAt(0)
    println("Tribonacci series with $number number")
    for (i in arrayList) {

        print("$i ")
    }
}
