from sklearn import linear_model
import matplotlib.pyplot as plt

# Sample data
X = [[1], [2], [3], [4]]
y = [2, 4, 5, 4]

# Create linear regression model
model = linear_model.LinearRegression()
model.fit(X, y)

# Make predictions
predictions = model.predict([[5]])

# Plot the data and regression line
plt.scatter(X, y, color='black')
plt.plot(X, model.predict(X), color='blue', linewidth=3)
plt.title('Linear Regression')
plt.xlabel('X')
plt.ylabel('y')
plt.show()
