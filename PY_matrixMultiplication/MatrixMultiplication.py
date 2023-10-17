def matrix_multiplication(mat1, mat2):
    if len(mat1[0]) != len(mat2):
        return "Matrix dimensions are not compatible for multiplication."

    result = [[0 for _ in range(len(mat2[0]))] for _ in range(len(mat1))]

    for i in range(len(mat1)):
        for j in range(len(mat2[0])):
            for k in range(len(mat2)):
                result[i][j] += mat1[i][k] * mat2[k][j]

    return result

# Example usage:
matrix1 = [[1, 2], [3, 4]]
matrix2 = [[5, 6], [7, 8]]
result = matrix_multiplication(matrix1, matrix2)
print("Matrix Multiplication Result:")
for row in result:
    print(row)
