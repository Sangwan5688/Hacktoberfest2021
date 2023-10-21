#include <iostream>
#include <vector>

bool canJump(std::vector<int>& nums) {
    int maxReach = 0; // maximum reachable index
    int n = nums.size();

    for (int i = 0; i < n; i++) {
        if (i > maxReach) {
            return false; // if you can't reach this position, return false
        }
        maxReach = std::max(maxReach, i + nums[i]); // update the maximum reachable index
        if (maxReach >= n - 1) {
            return true; // if you can reach the end, return true
        }
    }

    return false;
}

int main() {
    std::vector<int> jumpArray = {2, 3, 1, 1, 4}; // Change this array as needed

    if (canJump(jumpArray)) {
        std::cout << "You can reach the end of the array." << std::endl;
    } else {
        std::cout << "You can't reach the end of the array." << std::endl;
    }

    return 0;
}
