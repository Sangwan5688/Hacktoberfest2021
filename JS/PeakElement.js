class PeakElement {
    findPeakElement(arr) {
        let s = 0;
        let e = arr.length - 1;
        while (s < e) {
            let m = s + Math.floor((e - s) / 2);
            if (arr[m + 1] < arr[m]) {
                e = m;
            } else {
                s = m + 1;
            }
        }
        return s;
    }
}

// Example usage
const peakFinder = new PeakElement();
const arr = [1, 2, 3, 1];
const peakIndex = peakFinder.findPeakElement(arr);

console.log("The index of the peak element is:", peakIndex);
