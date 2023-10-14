#include <vector>

class PeakElement {
public:
    int findPeakElement(std::vector<int>& arr) {
        int s = 0, e = arr.size() - 1;
        while (s < e) {
            int m = s + (e - s) / 2;
            if (arr[m + 1] < arr[m]) {
                e = m;
            }
            else {
                s = m + 1;
            }
        }
        return s;
    }
};

int main() {
    PeakElement peakFinder;
    std::vector<int> arr = {1, 2, 3, 1};
    int peakIndex = peakFinder.findPeakElement(arr);

    // The index of the peak element is stored in 'peakIndex'
    return 0;
}
