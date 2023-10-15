#include <iostream>
#include <thread>
#include <chrono>

// Simulated Robot Class
class Robot {
public:
    void moveForward(int distance) {
        std::cout << "Moving forward " << distance << " units." << std::endl;
    }

    void turnLeft() {
        std::cout << "Turning left." << std::endl;
    }

    void turnRight() {
        std::cout << "Turning right." << std::endl;
