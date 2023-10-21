/**
 * Design a data structure that supports the following two operations:
 *
 * void addWord(word)
 * bool search(word)
 * search(word) can search a literal word or a regular expression string containing only letters a-z or ..
 * A . means it can represent any one letter.
 *
 * For example:
 *
 * addWord("bad")
 * addWord("dad")
 * addWord("mad")
 * search("pad") -> false
 * search("bad") -> true
 * search(".ad") -> true
 * search("b..") -> true
 * Note:
 * You may assume that all words are consist of lowercase letters a-z.
 */

class simpleTrieNode {
    val children = hashMapOf<Char, simpleTrieNode>()
    var isWord = false
}

// T:O(min(n, h)), per operation  S:O(min(n, h))
class Solution_add_and_search_word_data_structure_design {
    val root: simpleTrieNode = simpleTrieNode()

    fun addWord(word: String) {
        var cur = root
        for (c in word) {
            if (!cur.children.containsKey(c)) {
                val temp = simpleTrieNode()
                cur.children.put(c, temp)
                cur = temp
            } else {
                cur = cur.children[c]!!
            }
        }
        cur.isWord = true
    }

    fun searchWordHelper(word: String, startNode: simpleTrieNode): Boolean {
        if (word.isEmpty())
            return true
        var cur = startNode
        for (i in 0..word.length - 1) {
            if (cur.children.isEmpty())
                return false
            if (word[i] != '.') {
                if (!cur.children.containsKey(word[i]))
                    return false
                cur = cur.children[word[i]]!!
            } else {
                return cur.children.values.firstOrNull { searchWordHelper(word.substring(i + 1), it) } != null
            }
        }

        return cur.isWord
    }

    fun search(word: String): Boolean {
        return searchWordHelper(word, root)
    }
}

fun main(args: Array<String>) {
    val s = Solution_add_and_search_word_data_structure_design()
    s.addWord("bad")
    s.addWord("dad")
    s.addWord("mad")
    println(s.search("pad"))
    println(s.search("bad"))
    println(s.search(".ad"))
    println(s.search("b.."))
    println(s.search("b..."))
}
