class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        vector<vector<int>>v;
        priority_queue<vector<int>>pq;
        sort(nums.begin(),nums.end());
        int n=nums.size();
        for(int i=0;i<n-3;i++)
        {
            if(i==0 || (i>0 && nums[i]!=nums[i-1]))
            {
                for(int j=i+1;j<n-2;j++)
                {
                    long long x=nums[i]+nums[j];
                    long long t=target-x;
                    int l=j+1;int h=n-1;
                    while(l<h)
                    {
                        if((nums[l]+nums[h])==t)
                        {
                            vector<int>temp;
                            temp.push_back(nums[i]);
                            temp.push_back(nums[j]);
                            temp.push_back(nums[l]);
                            temp.push_back(nums[h]);
                            pq.push(temp);
                            while(l<h && nums[l]==nums[l+1])
                            l++;
                            while(l<h && nums[h]==nums[h-1])
                            h--;
                            l++;h--;
                        }
                        else if((nums[l]+nums[h])<t)
                        l++;
                        else
                        h--;
                    }
                
                }
            }
        }
        while(!pq.empty())
        {
            vector<int>x=pq.top();
            pq.pop();
            if(pq.empty()|| (x!=pq.top()))
            v.push_back(x);
        }
        return v;
    }
};
