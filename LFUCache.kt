/**
 * Design and implement a data structure for a Least Frequently Used (LFU) cache.
 * Implement the LFUCache class:
 * LFUCache(int capacity) Initializes the object with the capacity of the data structure.
 * int get(int key) Gets the value of the key if the key exists in the cache. Otherwise, returns -1.
 * void put(int key, int value) Update the value of the key if present, or inserts the key if not already present.
 * When the cache reaches its capacity, it should invalidate and remove the least frequently used key before inserting a new item.
 * For this problem, when there is a tie (i.e., two or more keys with the same frequency), the least recently used key would be invalidated.
 * To determine the least frequently used key, a use counter is maintained for each key in the cache.
 * The key with the smallest use counter is the least frequently used key.
 * When a key is first inserted into the cache, its use counter is set to 1 (due to the put operation).
 * The use counter for a key in the cache is incremented either a get or put operation is called on it.
 * The functions get and put must each run in O(1) average time complexity.
 *
 * Constraints:
 * 0 <= capacity <= 10^4
 * 0 <= key <= 10^5
 * 0 <= value <= 10^9
 * At most 2 * 10^5 calls will be made to get and put.
 */
class LFUCache(capacity: Int) {
    // At first glance this is somewhat similar to LRU cache, so my initial thought is still on double linked list.
    // Keep frequency in order and min frequency group is at tail. Can even manipulate least recent used as well with order.
    // But increment frequency can be inefficient, as it might need to go across entire list to find next spot.
    // In fact, each segament of this list is not tightly related. If put each segament in map, then I got hashMapOf<Int, LinkedHashSet<Int>>.
    // LinkedHashSet is perfect here, as it maintains order to help with removing least recently used,
    // and also provides O(1) for add and remove.
    // There also requires another map for key-value, and pointing to this map, so hashMapOf<Int, Pair<Int, Int>> will do.
    // Another tricky thing is to get min frequency. Now there is no tail, so how to find it?
    // The answer is to keep track of it. One gotcha point is that when put values, don't need to remove if key already exists,
    // and if key does not exist, after operation min frequency is always 1 from this new key.
    // So basically:
    private val cap = capacity
    private var cnt = 0
    private var mf = Int.MAX_VALUE  // min frequency

    // key - (frequency, value)
    private val map1 = hashMapOf<Int, Pair<Int, Int>>()

    // frequency - keys
    private val map2 = hashMapOf<Int, LinkedHashSet<Int>>()

    fun get(key: Int): Int {
        if (!map1.containsKey(key)) return -1
        val f = map1[key]!!.first
        val v = map1[key]!!.second
        incrementFrequency(key, v, f)
        return v
    }

    fun put(key: Int, value: Int) {
        if (cap <= 0) return        // Edge case handling
        if (!map1.containsKey(key)) {
            if (cnt >= cap) {
                remove()
                cnt--
            }
            putAbsent(key, value)
            cnt++
        } else {
            putPresent(key, value)
        }
    }

    private fun putAbsent(key: Int, value: Int) {
        map1[key] = Pair(1, value)
        map2.putIfAbsent(1, LinkedHashSet())
        map2[1]?.add(key)
        // Update min frequency
        mf = 1
    }

    private fun putPresent(key: Int, value: Int) {
        val f = map1[key]!!.first
        incrementFrequency(key, value, f)
    }

    private fun remove() {
        if (map2.containsKey(mf)) {
            val key = map2[mf]!!.iterator().next()
            map1.remove(key)
            map2[mf]?.remove(key)
        }
    }

    private fun incrementFrequency(k: Int, v: Int, f: Int) {
        map1[k] = Pair(f + 1, v)
        map2[f]?.remove(k)
        // Update min frequency
        if (mf == f && map2[f]?.isEmpty() == true) {
            mf = f + 1
        }
        map2.putIfAbsent(f + 1, LinkedHashSet())
        map2[f + 1]?.add(k)
    }
}