/*
    TODO: Time To Burn Tree 
    ? https://www.codingninjas.com/codestudio/problems/time-to-burn-tree_630563
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
BinaryTreeNode<int>* head = nullptr;
map<BinaryTreeNode<int>*,BinaryTreeNode<int>*> mp;
void find(BinaryTreeNode<int>* root, int start) {
    queue<BinaryTreeNode<int>*> q;
    q.push(root);

    while(!q.empty()) {
        BinaryTreeNode<int>* node = q.front();
        q.pop();
        if(node->data == start) head = node;
        if(node->left) {
            mp[node->left] = node;
            q.push(node->left);
        }
        if(node->right) {
            mp[node->right] = node;
            q.push(node->right);
        }
    }
}

int timeToBurnTree(BinaryTreeNode<int>* root, int start) {
    if(root == nullptr) return 0;
    map<int, bool> visit;
    find(root,start);
    queue<BinaryTreeNode<int>*> q;
    q.push(head);
    visit[head->data] = true;
    int ans = 0;
    
    while(!q.empty()) {
        int sz = q.size();
        for(int i=0;i<sz;i++) {
            BinaryTreeNode<int>* node = q.front();
            q.pop();

            if(mp.find(node) != mp.end() and !visit[mp[node]->data]) 
                q.push(mp[node]), visit[mp[node]->data] = true;
            if(node->left and !visit[node->left->data]) 
                q.push(node->left), visit[node->left->data] = true;
            if(node->right and !visit[node->right->data]) 
                q.push(node->right), visit[node->right->data] = true;
        }
        ans++;
    }
    return ans-1;
}

//! Java
public class Solution {
	public static BinaryTreeNode<Integer> head = null;
	public static Map<BinaryTreeNode<Integer>,BinaryTreeNode<Integer>> mp = new HashMap<>();
	public static void find(BinaryTreeNode<Integer> root, int start) {
		Queue<BinaryTreeNode<Integer>> q = new LinkedList<>();
		q.offer(root);

		while(!q.isEmpty()) {
			BinaryTreeNode<Integer> node = q.peek();
			q.poll();

			if(node.data == start) head = node;
			if(node.left != null) {
				mp.put(node.left, node);
				q.offer(node.left);
			}
			if(node.right != null) {
				mp.put(node.right, node);
				q.offer(node.right);
			}
		}
	}
	public static int timeToBurnTree(BinaryTreeNode<Integer> root, int start) {
        if(root == null) return 0;
		Map<Integer,Boolean> visit = new HashMap<>();
		find(root,start);

		Queue<BinaryTreeNode<Integer>> q = new LinkedList<>();
		q.offer(head);
		visit.put(head.data, true);
		int ans = 0;
		
		while(!q.isEmpty()) {
			int sz = q.size();
			for(int i=0;i<sz;i++) {
				BinaryTreeNode<Integer> node = q.peek();
				q.poll();

				if(mp.containsKey(node) && !visit.containsKey(mp.get(node).data)) {
					q.offer(mp.get(node));
					visit.put(mp.get(node).data, true);
				}
					
				if(node.left != null && !visit.containsKey(node.left.data)) {
					q.offer(node.left);
					visit.put(node.left.data, true);
				}
					
				if(node.right != null && !visit.containsKey(node.right.data)) {
					q.offer(node.right);
					visit.put(node.right.data, true);
				}
					
			}
			ans++;
		}
		return ans-1;
    }
}