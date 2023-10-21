import java.lang.Integer.max
import java.lang.Integer.min

/**
 * Given a list accounts, each element accounts\[i] is a list of strings,
 * where the first element accounts[i][0] is a name,
 * and the rest of the elements are emails representing emails of the account.
 *
 * Now, we would like to merge these accounts.
 * Two accounts definitely belong to the same person if there is some email that is common to both accounts.
 * Note that even if two accounts have the same name,
 * they may belong to different people as people could have the same name.
 * A person can have any number of accounts initially, but all of their accounts definitely have the same name.
 *
 * After merging the accounts, return the accounts in the following format:
 * the first element of each account is the name, and the rest of the elements are emails in sorted order.
 * The accounts themselves can be returned in any order.
 *
 * Example 1:
 * Input:
 * accounts = [["John", "johnsmith@mail.com", "john00@mail.com"],
 *             ["John", "johnnybravo@mail.com"],
 *             ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
 *             ["Mary", "mary@mail.com"]]
 * Output: [["John", 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com'],
 *          ["John", "johnnybravo@mail.com"], ["Mary", "mary@mail.com"]]
 *
 * Explanation:
 * The first and third John's are the same person as they have the common email "johnsmith@mail.com".
 * The second John and Mary are different people as none of their email addresses are used by other accounts.
 * We could return these lists in any order,
 * for example the answer [['Mary', 'mary@mail.com'],
 *                         ['John', 'johnnybravo@mail.com'],
 *                         ['John', 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com']]
 * would still be accepted.
 *
 * Note:
 *
 * The length of accounts will be in the range [1, 1000].
 * The length of accounts\[i] will be in the range [1, 10].
 * The length of accounts\[i]\[j] will be in the range [1, 30].
 */

class Solution_accounts_merge {

    private inner class ConnectedUnion {

        private val pathList = mutableListOf<Int>()

        fun getId(): Int {
            pathList.add(pathList.size)
            return pathList.last()
        }

        fun findRoot(x: Int): Int {
            if (pathList[x] != x) {
                pathList[x] = findRoot(pathList[x])
            }
            return pathList[x]
        }

        fun setUnion(x: Int, y: Int) {
            val xRoot = findRoot(x)
            val yRoot = findRoot(y)
            if (xRoot != yRoot) {
                pathList[min(xRoot, yRoot)] = max(xRoot, yRoot)
            }
        }

    }

    // T:O(nlogn)
    // S:O(n)
    fun accountsMerge(accounts: List<List<String>>): List<List<String>> {
        val emailToId = mutableMapOf<String, Int>()
        val emailToName = mutableMapOf<String, String>()
        val union = ConnectedUnion()
        // put emails into union
        for (account in accounts) {
            val name = account[0]
            for (i in 1.until(account.size)) {
                // assign id if not assigned
                if (!emailToId.containsKey(account[i])) {
                    emailToId[account[i]] = union.getId()
                    emailToName[account[i]] = name
                }
                // root to first email
                union.setUnion(emailToId[account[1]]!!, emailToId[account[i]]!!)
            }
        }
        // group emails by root id
        val idToEmails = mutableMapOf<Int, MutableList<String>>()
        emailToId.keys.forEach {
            idToEmails.putIfAbsent(union.findRoot(emailToId[it]!!), mutableListOf())
            idToEmails[union.findRoot(emailToId[it]!!)]?.add(it)
        }

        val ret = mutableListOf<MutableList<String>>()
        idToEmails.values.forEach {
            // name
            val tempList = mutableListOf(emailToName[it[0]]!!)
            // do not forget to sort emails
            // because emails size is limited, we can see this as O(1) operation
            tempList.addAll(it.sorted())
            ret.add(tempList)
        }
        return ret
    }
}

fun main(args: Array<String>) {
    // LC OJ passed
    val accounts = listOf(listOf("John", "johnsmith@mail.com", "john00@mail.com"),
            listOf("John", "johnnybravo@mail.com"),
            listOf("John", "johnsmith@mail.com", "john_newyork@mail.com"),
            listOf("Mary", "mary@mail.com"))
    print(Solution_accounts_merge().accountsMerge(accounts))
}