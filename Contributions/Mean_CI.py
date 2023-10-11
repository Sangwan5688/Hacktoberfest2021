import pandas as pd
import numpy as np
from sklearn.utils import resample
from matplotlib import pyplot as plt

plt.style.use('bmh')
pd.options.mode.chained_assignment = None
df = pd.read_csv('../googleplay.csv')

df.dropna(inplace=True)

x = df['Reviews']


n_iterations = 4000
n_size = int(len(x))

medians = list()
for i in range(n_iterations):
    s = resample(x, n_samples=n_size)
    m = np.median(s)
    medians.append(m)

# confidence intervals
alphas = [0.90, 0.95, 0.99]
lower = []
upper = []
for alpha in alphas:
    p = ((1.0-alpha)/2.0) * 100
    lower.append(np.percentile(medians, p))
    p = (alpha+((1.0-alpha)/2.0)) * 100
    upper.append(np.percentile(medians, p))

for i in range(3):
    print(f"\n{alphas[i]*100} confidence interval {lower[i]} and {upper[i]}")

# plot
fig, reviews = plt.subplots()
y = np.linspace(0, 1000)
reviews.set_title("Reviews Confidence Interval (CI)")
reviews.set_xlabel("Reviews (Review)")
reviews.set_ylabel("Quantity")
reviews.hist(medians)
color = [(1, 0, 0), (0, 1, 0), (0, 0, 1)]
for i, l, u in zip(range(3), lower, upper):
    x1 = np.linspace(l, l)
    x2 = np.linspace(u, u)
    reviews.plot(x1, y, color=color[i])
    reviews.plot(x2, y, color=color[i])
    plt.text(l-100, 1100, f'lower {alphas[i]*100} ({l:.2f})', rotation=90)
    plt.text(u-100, 1100, f'upper {alphas[i]*100} ({u:.2f})', rotation=90)
plt.show()