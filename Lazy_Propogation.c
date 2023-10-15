#include <stdio.h>

#define MAXN 100000

int arr[MAXN]; // The original array.
int tree[4 * MAXN]; // The segment tree to store ranges.
int lazy[4 * MAXN]; // The lazy array to store pending updates.

// Build the segment tree.
void build(int node, int start, int end) {
    if (start == end) {
        tree[node] = arr[start];
    } else {
        int mid = (start + end) / 2;
        build(2 * node, start, mid);
        build(2 * node + 1, mid + 1, end);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }
}

// Update the range [l, r] with value val.
void update(int node, int start, int end, int l, int r, int val) {
    if (lazy[node] != 0) {
        // Propagate the lazy value to this node.
        tree[node] += (end - start + 1) * lazy[node];
        if (start != end) {
            lazy[2 * node] += lazy[node];
            lazy[2 * node + 1] += lazy[node];
        }
        lazy[node] = 0; // Reset the lazy value.
    }

    if (start > r || end < l) {
        return;
    }

    if (start >= l && end <= r) {
        // Update the node and propagate to children.
        tree[node] += (end - start + 1) * val;
        if (start != end) {
            lazy[2 * node] += val;
            lazy[2 * node + 1] += val;
        }
        return;
    }

    int mid = (start + end) / 2;
    update(2 * node, start, mid, l, r, val);
    update(2 * node + 1, mid + 1, end, l, r, val);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
}

// Query the sum of elements in the range [l, r].
int query(int node, int start, int end, int l, int r) {
    if (lazy[node] != 0) {
        // Propagate the lazy value to this node.
        tree[node] += (end - start + 1) * lazy[node];
        if (start != end) {
            lazy[2 * node] += lazy[node];
            lazy[2 * node + 1] += lazy[node];
        }
        lazy[node] = 0; // Reset the lazy value.
    }

    if (start > r || end < l) {
        return 0;
    }

    if (start >= l && end <= r) {
        return tree[node];
    }

    int mid = (start + end) / 2;
    int left = query(2 * node, start, mid, l, r);
    int right = query(2 * node + 1, mid + 1, end, l, r);
    return left + right;
}

int main() {
    int n = 8; // Size of the array
    for (int i = 0; i < n; i++) {
        arr[i] = i + 1;
    }

    build(1, 0, n - 1);

    // Update range [1, 3] with value 2.
    update(1, 0, n - 1, 1, 3, 2);

    // Query sum of elements in range [2, 5].
    int result = query(1, 0, n - 1, 2, 5);
    printf("Sum in range [2, 5]: %d\n", result);

    return 0;
}
