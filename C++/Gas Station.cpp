////..............famous interview Queue Data Structure Question...........////
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        //petrol ki kitni kami hai yani Ghat ti
        int deficit =0;
        //petrol kitna bacha hua hai
        int balance =0;
        ///circuit kha se suru kre 
        int start =0;
        for(int i =0;i<gas.size();i++){
            balance += gas[i] - cost[i];
            if(balance < 0){
                deficit += abs(balance); // yahi par galti hoti hai...deficit ko increment krna padega
                start = i+1;
                balance =0;
            }
        }
        if(balance >= deficit ){
            return start;
        }
        else{
            return -1;
        }
    }
};