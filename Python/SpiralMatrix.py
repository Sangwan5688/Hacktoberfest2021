class SpiralMatrix:
    def spiralOrder(self, matrix):
        if not matrix:
            return []

        n, m = len(matrix), len(matrix[0])
        left, right, top, bottom = 0, m - 1, 0, n - 1
        result = []

        while left <= right and top <= bottom:
            for i in range(left, right + 1):
                result.append(matrix[top][i])
            top += 1

            for i in range(top, bottom + 1):
                result.append(matrix[i][right])
            right -= 1

            if top <= bottom:
                for i in range(right, left - 1, -1):
                    result.append(matrix[bottom][i])
                bottom -= 1

            if left <= right:
                for i in range(bottom, top - 1, -1):
                    result.append(matrix[i][left])
                left += 1

        return result

# Example usage
spiral = SpiralMatrix()
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
result = spiral.spiralOrder(matrix)
print(result)
