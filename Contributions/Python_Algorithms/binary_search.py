def binary_search_while(arr, key):
    arr.sort()
    l_index, h_index = 0, len(arr) - 1
    while l_index <= h_index:
        mid = h_index - (h_index - l_index) // 2
        if key < arr[mid]:
            h_index = mid - 1
        elif key > arr[mid]:
            l_index = mid + 1
        else:
            return arr[mid]
    else:
        return


def binary_search_re(arr, key):
    arr.sort()

    def binary_search_re_do(l_index, h_index):
        if l_index >= h_index:
            return arr[l_index]
        mid = h_index - (h_index - l_index) // 2
        if key < arr[mid]:
            return binary_search_re_do(l_index, mid - 1)
        elif key > arr[mid]:
            return binary_search_re_do(mid + 1, h_index)
        else:
            return arr[mid]

    return binary_search_re_do(0, len(arr) - 1)
