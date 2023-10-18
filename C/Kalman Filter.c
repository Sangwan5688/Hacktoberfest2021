#include <stdio.h>

// Kalman filter variables
double x;   // Estimated state
double P;   // Estimated error covariance
double A;   // State transition model
double H;   // Measurement model
double Q;   // Process noise
double R;   // Measurement noise

// Kalman filter prediction step
void predict() {
    x = A * x;       // Predict the next state
    P = A * P * A + Q;  // Predict the error covariance
}

// Kalman filter correction step
void correct(double z) {
    double K = P * H / (H * P * H + R); // Calculate Kalman gain
    x = x + K * (z - H * x);            // Correct the state estimate
    P = (1 - K * H) * P;                // Correct the error covariance
}

int main() {
    //Give your own kalman variables as input.
    printf("Enter the initial state (X): ");
    scanf("%lf", &x);

    printf("Enter the initial error covariance (P): ");
    scanf("%lf", &P);

    printf("Enter the state transition model (A): ");
    scanf("%lf", &A);

    printf("Enter the measurement model (H): ");
    scanf("%lf", &H);

    printf("Enter the process noise (Q): ");
    scanf("%lf", &Q);

    printf("Enter the measurement noise (R): ");
    scanf("%lf", &R);

    // Simulated measurements
    double measurements[] = {1.1, 1.2, 1.3, 1.4, 1.5};

    int num_measurements = sizeof(measurements) / sizeof(measurements[0]);

    // Apply the Kalman filter to each measurement
    for (int i = 0; i < num_measurements; i++) {
        predict();            // Prediction step
        correct(measurements[i]); // Correction step
        printf("Measurement: %.2f, Estimated State: %.2f\n", measurements[i], x);
    }

    return 0;
}
