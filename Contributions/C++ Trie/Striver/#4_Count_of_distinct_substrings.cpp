/*
    TODO: Count of distinct substrings
    ? https://practice.geeksforgeeks.org/problems/count-of-distinct-substrings/1
*/

class Node {
private:
    Node* links[26];
    int cntEndWith = 0, cntPrefix = 0;
public:
    bool containKey(char ch) { return (links[ch - 'a'] != nullptr); }
    Node* get(char ch) { return links[ch - 'a']; }
    void put(char ch, Node* node) { links[ch - 'a'] = node; } 
    void setEnd() { cntEndWith++; }
    void incPre() { cntPrefix++; }
    void delEnd() { cntEndWith--; }
    void delPre() { cntPrefix--; }
    int getEnd() { return cntEndWith; }
    int getPre() { return cntPrefix; }
};

int countDistinctSubstring(string s) {
    Node* root = new Node();
    int cnt = 0, n = s.size();
    
    for(int i=0;i < n;i++) {
        string temp = s.substr(i,n - i);
        Node* node = root;
        for(auto ch : temp) {
            if(node->containKey(ch) == false) {
                node->put(ch,new Node());
                cnt++;
            }
            node = node->get(ch);
            node->incPre();
        }
    }
    return cnt + 1;
}