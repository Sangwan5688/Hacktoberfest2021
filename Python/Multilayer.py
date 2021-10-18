import numpy as np

class MLP:

    def __init__(self, train_data, target, lr=0.1, num_epochs=100, num_input=2, num_hidden=2, num_output=1):
        self.train_data = train_data
        self.target = target
        self.lr = lr
        self.num_epochs = num_epochs
        self.weights_01 = np.random.uniform(size=(num_input, num_hidden))
        self.weights_12 = np.random.uniform(size=(num_hidden, num_output))
        self.b01 = np.random.uniform(size=(1,num_hidden))
        self.b12 = np.random.uniform(size=(1,num_output))
        self.losses = []

    def update_weights(self):
        loss = 0.5 * (self.target - self.output_final) ** 2
        self.losses.append(np.sum(loss))
        error_term = (self.target - self.output_final)

        grad01 = self.train_data.T @ (((error_term * self.delsigmoid(self.output_final)) * self.weights_12.T) * self.delsigmoid(self.hidden_out))
        grad12 = self.hidden_out.T @ (error_term * self.delsigmoid(self.output_final))

        self.weights_01 += self.lr * grad01
        self.weights_12 += self.lr * grad12

        self.b01 += np.sum(self.lr * ((error_term * self.delsigmoid(self.output_final)) * self.weights_12.T) * self.delsigmoid(self.hidden_out), axis=0)
        self.b12 += np.sum(self.lr * error_term * self.delsigmoid(self.output_final), axis=0)

    def sigmoid(self, x):
        return 1 / (1 + np.exp(-x))

    def delsigmoid(self, x):
        return x * (1 - x)

    def forward(self, batch):
        self.hidden_ = np.dot(batch, self.weights_01) + self.b01
        self.hidden_out = self.sigmoid(self.hidden_)

        self.output_ = np.dot(self.hidden_out, self.weights_12) + self.b12
        self.output_final = self.sigmoid(self.output_)

        return self.output_final

    def classify(self, datapoint):
        datapoint = np.transpose(datapoint)
        if self.forward(datapoint) >= 0.5:
            return 1

        return 0

    def train(self):
        for epoch in range(self.num_epochs):
            self.forward(self.train_data)
            self.update_weights()
    
    def test(self, X):
      for i in range(X.shape[0]):
        y = self.classify(X[i])
        print('[x1, X2]: {}, Output:{}'.format(X[i], y))

if __name__ == '__main__':

  train_data = np.array([
      [0.001, 0.97],
      [0.002, 0.97],
      [0.01, 0.98],
      [0.97, 0.002],
      [0.98, 0.002],
      [0.95, 0.01],
      [0.97, 0.99],
      [0.95, 0.96],
      [0.94, 0.95],
      [0.001, 0.002],
      [0.002, 0.001],
      [0.032, 0.012]
  ])

  target_xor = np.array([
                         [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1]
                         ])
  
  test_X = np.array([
      [0.04, 0.90],
      [0.02, 0.96],
      [0.09, 0.90],
      [0.94, 0.02],
      [0.908, 0.02],
      [0.925, 0.1],
      [0.92, 0.94],
      [0.96, 0.92],
      [0.90, 0.89],
      [0.1, 0.12],
      [0.02, 0.1],
      [0.02, 0.1]
  ])

  p_xor = MLP(train_data, target_xor, 0.1, 100)
  p_xor.train()
  p_xor.test(test_X)
