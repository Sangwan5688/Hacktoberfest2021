def remove_duplicates(input_list):
    seen = set()
    unique_list = []
    for item in input_list:
        if item not in seen:
            seen.add(item)
            unique_list.append(item)
    return unique_list

# Example usage:
numbers = [1, 2, 2, 3, 4, 4, 5, 6, 6, 7]
unique_numbers = remove_duplicates(numbers)
print("List with duplicates removed:", unique_numbers)
    