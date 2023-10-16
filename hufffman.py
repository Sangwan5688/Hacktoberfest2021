import heapq
from collections import defaultdict, Counter

class HuffmanNode:
    def __init__(self, char, frequency):
        self.char = char
        self.frequency = frequency
        self.left = None
        self.right = None

    def __lt__(self, other):
        return self.frequency < other.frequency

def build_huffman_tree(data):
    char_frequency = Counter(data)

    # Create a priority queue (min heap) of Huffman nodes
    priority_queue = [HuffmanNode(char, freq) for char, freq in char_frequency.items()]
    heapq.heapify(priority_queue)
    while len(priority_queue) > 1:
        left_node = heapq.heappop(priority_queue)
        right_node = heapq.heappop(priority_queue)

        # Create a new internal node with a frequency equal to the sum of the children's frequencies
        internal_node = HuffmanNode(None, left_node.frequency + right_node.frequency)
        internal_node.left = left_node
        internal_node.right = right_node

        heapq.heappush(priority_queue, internal_node)

    # The remaining node in the priority queue is the root of the Huffman tree
    return priority_queue[0]

def build_huffman_codes(node, current_code, huffman_codes):
    if node is None:
        return

    if node.char is not None:
        huffman_codes[node.char] = current_code
        return

    build_huffman_codes(node.left, current_code + "0", huffman_codes)
    build_huffman_codes(node.right, current_code + "1", huffman_codes)

def huffman_encoding(data):
    if not data:
        return "", {}

    root = build_huffman_tree(data)
    huffman_codes = {}
    build_huffman_codes(root, "", huffman_codes)

    encoded_data = "".join(huffman_codes[char] for char in data)
    return encoded_data, huffman_codes

def huffman_decoding(encoded_data, huffman_codes):
    if not encoded_data:
        return ""

    reversed_codes = {code: char for char, code in huffman_codes.items()}

    decoded_data = ""
    current_code = ""
    for bit in encoded_data:
        current_code += bit
        if current_code in reversed_codes:
            decoded_data += reversed_codes[current_code]
            current_code = ""

    return decoded_data

if __name__ == "__main__":
    data = "this is an example for huffman encoding"
    
    encoded_data, huffman_codes = huffman_encoding(data)
    print("Encoded data:", encoded_data)
    
    decoded_data = huffman_decoding(encoded_data, huffman_codes)
    print("Decoded data:", decoded_data)
