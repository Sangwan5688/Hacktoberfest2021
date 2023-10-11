// C++ implementation of delete
// operations on Trie
#include <bits/stdc++.h>
using namespace std;

const int ALPHABET_SIZE = 26;

// trie node
struct TrieNode {
	struct TrieNode* children[ALPHABET_SIZE];

	// isEndOfWord is true if the node represents
	// end of a word
	bool isEndOfWord;
};

// Returns new trie node (initialized to NULLs)
struct TrieNode* getNode(void)
{
	struct TrieNode* pNode = new TrieNode;

	pNode->isEndOfWord = false;

	for (int i = 0; i < ALPHABET_SIZE; i++)
		pNode->children[i] = NULL;

	return pNode;
}

// If not present, inserts key into trie
// If the key is prefix of trie node, just
// marks leaf node
void insert(struct TrieNode* root, string key)
{
	struct TrieNode* pCrawl = root;

	for (int i = 0; i < key.length(); i++) {
		int index = key[i] - 'a';
		if (!pCrawl->children[index])
			pCrawl->children[index] = getNode();

		pCrawl = pCrawl->children[index];
	}

	// mark last node as leaf
	pCrawl->isEndOfWord = true;
}

// Returns true if key presents in trie, else
// false
bool search(struct TrieNode* root, string key)
{
	struct TrieNode* pCrawl = root;

	for (int i = 0; i < key.length(); i++) {
		int index = key[i] - 'a';
		if (!pCrawl->children[index])
			return false;

		pCrawl = pCrawl->children[index];
	}

	return (pCrawl != NULL && pCrawl->isEndOfWord);
}

// Returns true if root has no children, else false
bool isEmpty(TrieNode* root)
{
	for (int i = 0; i < ALPHABET_SIZE; i++)
		if (root->children[i])
			return false;
	return true;
}

// Recursive function to delete a key from given Trie
TrieNode* remove(TrieNode* root, string key, int depth = 0)
{
	// If tree is empty
	if (!root)
		return NULL;

	// If last character of key is being processed
	if (depth == key.size()) {

		// This node is no more end of word after
		// removal of given key
		if (root->isEndOfWord)
			root->isEndOfWord = false;

		// If given is not prefix of any other word
		if (isEmpty(root)) {
			delete (root);
			root = NULL;
		}

		return root;
	}

	// If not last character, recur for the child
	// obtained using ASCII value
	int index = key[depth] - 'a';
	root->children[index] =
		remove(root->children[index], key, depth + 1);

	// If root does not have any child (its only child got
	// deleted), and it is not end of another word.
	if (isEmpty(root) && root->isEndOfWord == false) {
		delete (root);
		root = NULL;
	}

	return root;
}

// Driver
int main()
{
	// Input keys (use only 'a' through 'z'
	// and lower case)
	string keys[] = { "the", "a", "there",
					"answer", "any", "by",
					"bye", "their", "hero", "heroplane" };
	int n = sizeof(keys) / sizeof(keys[0]);

	struct TrieNode* root = getNode();

	// Construct trie
	for (int i = 0; i < n; i++)
		insert(root, keys[i]);

	// Search for different keys
	search(root, "the") ? cout << "Yes\n" : cout << "No\n";
	search(root, "these") ? cout << "Yes\n" : cout << "No\n";

	remove(root, "heroplane");
	search(root, "hero") ? cout << "Yes\n" : cout << "No\n";
	return 0;
}

