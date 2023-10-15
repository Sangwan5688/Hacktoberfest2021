class PeakElement:
    def findPeakElement(self, arr):
        s, e = 0, len(arr) - 1
        while s < e:
            m = s + (e - s) // 2
            if arr[m + 1] < arr[m]:
                e = m
            else:
                s = m + 1
        return s

# Example usage
peak_finder = PeakElement()
arr = [1, 2, 3, 1]
peak_index = peak_finder.findPeakElement(arr)

print("The index of the peak element is:", peak_index)
