/*
    TODO: Maximum XOR With an Element From Array 
    ? https://www.codingninjas.com/codestudio/problems/max-xor-queries_1382020?utm_source=youtube&utm_medium=affiliate&utm_campaign=striver_tries_videos
*/


#include "bits/stdc++.h"
using namespace std;

//! offline queries
class Node {
private:
	Node* links[2];
public:
	bool containKey(int no) {
		return links[no] != nullptr;
	}
	void put(int no, Node* node) {
		links[no] = node;
	}
	Node* get(int no) {
		return links[no];
	}
};

class Trie {
private:
	Node* root = nullptr;
public:
	Trie() { root = new Node(); }
	void insert(int no) {
		Node* node = root;
		for(int i=31;i>=0;i--) {
			int isSet = (no & (1 << i)) == (1 << i) ? 1 : 0;
			if(node->containKey(isSet) == false) {
				node->put(isSet, new Node());
			}
			node = node->get(isSet);
		}
	}
	int getMax(int x) {
		int ans = 0;
        Node* node = root;
        vector<int> bt(32,0);

        for(int i=0;i<32;i++) 
            if(x & (1 << i)) bt[i] = 1;

        for(int i=bt.size()-1;i>=0;i--) {
            if(node->containKey(!bt[i])) {
                ans = ans | ((1 << i) * !bt[i]);
                // ans[i] = !bt[i];
                node = node->get(!bt[i]);
            } else if(node->containKey(bt[i])) 
				ans = ans | ((1 << i) * bt[i]), node = node->get(bt[i]);
			else return -1;
        }
		return ans^x;
	}
};

vector<int> maxXorQueries(vector<int> &arr, vector<vector<int>> &queries){
	Trie tr;
	vector<int> ans(queries.size());
	vector<vector<int>> mp;

	int index = 0;
	for(auto query : queries) {
		int xi = query[0], ai = query[1];
		mp.push_back({ai,xi,ai,index++});
	}

	sort(mp.begin(),mp.end(),[](const vector<int>& a, const vector<int>& b) {
		return a[0] < b[0];
	});

	queries.clear();
	for(auto &arrays : mp) {
		queries.push_back({arrays[1],arrays[2],arrays[3]});
	}
	sort(arr.begin(),arr.end());

	index = 0;
	for(auto query : queries) {
		int xi = query[0], ai = query[1], pos = query[2];
		// cout<<xi<<" "<<ai<<" "<<pos<<endl;
		for(int i=index;i<arr.size();i++) {
			if(arr[i] <= ai){
				tr.insert(arr[i]);
			}else {
				index = i;
				break;
			}
		}

		ans[pos] = tr.getMax(xi);
	}
	return ans;
}




//! fail1
#include "bits/stdc++.h"
using namespace std;

class Node {
private:
	Node* links[2];
public:
	bool containKey(int no) { return links[no] != nullptr; }
	void put(int no, Node* node) { links[no] = node; }
	Node* get(int no) { return links[no]; }
};

class Trie {
private:
	Node* root = nullptr;
public:
	Trie() { root = new Node(); }
	void insert(int no) {
		Node* node = root;
		for(int i=31;i>=0;i--) {
			int isSet = (no & (1 << i)) == (1 << i) ? 1 : 0;
			if(node->containKey(isSet) == false) {
				node->put(isSet, new Node());
			}
			node = node->get(isSet);
		}
	}
	int findXor(int no, int bound) {
		int ans = 0;
		Node* node = root;

		// bitset<32> bt(bound);
		// cout<<no<<endl;


		bool flag = false;   
		for(int i=31;i>=0;i--) {
			int isSet = (bound & (1 << i)) == (1 << i) ? 1 : 0;


			if(isSet == 0 and flag == false) {
				if(node->containKey(isSet) == false) {
					// cout<<endl;
					return -1;
				}
				node = node->get(isSet);
				// cout<<0;
			} else {
				// if(!flag) cout<<"-";
				flag = true;
				if(no&(1 << i)) {
					// cout<<1;
					if(node->containKey(0)) {
						// cout<<0;
						node = node->get(0);
					} else {
						// cout<<1;
						ans = ans | (1 << i);
						node = node->get(1);
					}
				}
				else {
					// cout<<0;
					if(node->containKey(1)) {
						// cout<<1;
						ans = ans | (1 << i);
						node = node->get(1);
					} else {
						// cout<<0;
						node = node->get(0);
					}
				}

			}
		}

		// cout<<endl;
		
		// cout<<ans<<" "<<no<<endl;
		return ans^no;
	}
};

vector<int> maxXorQueries(vector<int> &arr, vector<vector<int>> &queries){
	int n = arr.size();
	Trie trie;
	for(auto it : arr) trie.insert(it);

	vector<int> ans;
	for(auto arrays : queries) {
		int x = arrays[0], bound = arrays[1];
		if(x != 0) ans.push_back(trie.findXor(x, bound));
		else {
			int mx = -1;
			for(auto no : arr) if(no <= bound) mx = max(mx,no);
			ans.push_back(mx);
		}
		// cout<<x<<" "<<bound<< " "<<ans.back()<<endl;
	}

	return ans;
}