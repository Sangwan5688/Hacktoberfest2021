function generateFibonacciSeries(n) {
    const series = [0, 1];

    for (let i = 2; i < n; i++) {
        const next = series[i - 1] + series[i - 2];
        series.push(next);
    }

    return series;
}

function printFibonacciSeries(series) {
    console.log("Fibonacci Series: " + series.join(", "));
}

const n = 10; // Change this to the number of terms you want
const fibonacciSeries = generateFibonacciSeries(n);
printFibonacciSeries(fibonacciSeries);
