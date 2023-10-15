#include "bits/stdc++.h"
using namespace std;

#define int        long long
#define pb         push_back
#define ppb        pop_back
#define all(x)     (x).begin(),(x).end()
#define uniq(v)    (v).erase(unique(all(v)),(v).end())
#define sz(x)      (int)((x).size())
#define fr         first
#define sc         second
#define pii        pair<int,int>
#define rep(i,a,b) for(int i=a;i<b;i++)
#define print(a)   for(auto &i: a){cout<<i<<" ";if(&i == &a.back()) cout<<endl;}
#define input(a)   for(auto &i: a){ cin>>i; }

void solve(){
	/* Pair */
	pair<int,int> pr = {1,3};
	cout<<pr.fr<<" "<<pr.sc<<endl;

	pair<int,pair<int,int>> p = {1,{2,4}};
	cout<<p.fr<<" "<<p.sc.fr<<" "<<p.sc.sc<<endl;

	pair<int,int> arr[] = {{1,2},{3,4}};
	int pair_size = sizeof(arr)/sizeof(arr[0]);
	for(int i=0;i<pair_size;i++){
		cout<<arr[i].fr<<" "<<arr[i].sc<<endl;
	}

	/* vector */
	vector<int> v;
	v.push_back(1);
	v.emplace_back(2);
	vector<pair<int,int>> vec;
	vec.push_back({3,4});
	vec.emplace_back(5,6);
	vector<int> vec1(5,100); // 100 100 100 100 100
	vector<int> v1(5); // 0 0 0 0 0 
	vector<int> copy(vec1); // 100 100 100 100 100

	/* Iterator */
	vector<int>::iterator it = v.begin();
	cout<<*it<<endl; // 1
	it++;
	cout<<*it<<endl; // 2
	vector<int>::iterator it1 = v.end(); // point to memory address after 2
	auto it2 = v.rend(); // point to memory address before
	auto it3 = v.rbegin(); // point to last element of vector

	/* Const Vector */
	auto it4 = v.cbegin();
	auto it5 = v.rend();
	cout<<v[0]<<" "<<v.at(0)<<endl; // 1 1
	cout<<v.back()<<endl; // 2

	/* Printing Vector */
	for(int i=0;i<vec.size();i++)
	cout<<vec[i].fr<<" "<<vec[i].sc<<endl;

	for(vector<int>::iterator it = v.begin(); it != v.end(); it++)
	cout<<*it<<" ";  

	for(auto it = v.begin(); it != v.end(); it++)
	cout<<*it<<" ";

	for(auto i : v)
	cout<<i<<" ";

	/* Erase Particular */

	vec.erase(vec.begin()+1); // erase particular 
	vector<int> arr1 = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19};
	arr1.erase(arr1.begin()+1, arr1.begin()+15); // 1 16 17 18 19

	/* Insert */
	arr1.insert(arr1.begin(),300); // 300 1 16 17 18 19 -> insert a particular index
	arr1.insert(arr1.begin(),vec1.begin(), vec1.end()); // 100 100 100 100 100 300 1 16 17 18 19

	/* Inbuit Function */
	vector<int> v11 = {1,2}, v22 = {3,4};
	v11.swap(v22); // v11 = {3,4}, v22 = {1,2} ⭐
	cout<<v11.size();  
	v11.clear();
	cout<<v11.empty();

	/* List */
	list<int> ls;
	ls.push_back(2); // 2
	ls.push_front(1); // 1 2
	ls.emplace_front(5); // 5 1 2
	ls.insert(ls.begin(),{1,1,1,2,3,23,23});
	// begin(), end(), rbegin(), rend(), clear(), insert(), size(), swap()

	/* Dequeue */
	deque<int> dq;
	dq.push_back(1); // 1
	dq.emplace_back(2); // 1 2
	dq.push_front(3); // 3 1 2
	dq.emplace_front(4); // 4 3 1 2
	dq.pop_front(); // 3 1 2
	dq.pop_back(); // 3 1
	cout<<dq.front(); // 3
	cout<<dq.back(); // 1

	/* Stack */
	stack<int> st;
	st.push(1); // 1
	st.push(2); // 2 1
	st.push(3); // 3 2 1
	st.push(4); // 4 3 2 1
	st.emplace(5); // 5 4 3 2 1


	cout<<endl;
	while(!st.empty()){
	cout<<st.top()<<" ";
		st.pop();
	}

}

signed main(){
    int t = 1;
    cin>>t;
    while(t--) solve();
    return 0;
}