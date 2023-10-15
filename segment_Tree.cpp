#include <bits/stdc++.h>

using namespace std;

class SegmentTree {
	vector<int> tree;
	int size;

public:
	SegmentTree(vector<int>& array) {
		size = array.size();
		tree.resize(4 * size);
		buildTree(array, 0, 0, size - 1);
	}

private:
	void buildTree(vector<int>& array, int treeIndex, int left, int right) {
		if (left == right) {
			tree[treeIndex] = array[left];
			return;
		}
		int mid = left + (right - left) / 2;
		buildTree(array, 2 * treeIndex + 1, left, mid);
		buildTree(array, 2 * treeIndex + 2, mid + 1, right);
		tree[treeIndex] = min(tree[2 * treeIndex + 1], tree[2 * treeIndex + 2]);
	}

	int query(int treeIndex, int left, int right, int queryLeft, int queryRight) {
		if (queryLeft <= left && right <= queryRight)
			return tree[treeIndex];
		int mid = left + (right - left) / 2;
		int minValue = INT_MAX;
		if (queryLeft <= mid)
			minValue = min(minValue, query(2 * treeIndex + 1, left, mid, queryLeft, queryRight));
		if (queryRight > mid)
			minValue = min(minValue, query(2 * treeIndex + 2, mid + 1, right, queryLeft, queryRight));
		return minValue;
	}

public:
	int query(int left, int right) {
		return query(0, 0, size - 1, left, right);
	}
};

int main() {
	vector<int> array = {1, 3, 2, 5, 4, 6};
	SegmentTree st(array);
	cout << st.query(1, 5) << endl; // 2
	return 0;
}
