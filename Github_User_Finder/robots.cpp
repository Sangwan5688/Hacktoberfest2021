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
    }
};

int main() {
    Robot robot;

    // Commands for the Robot
    robot.moveForward(10); // Move forward 10 units
    std::this_thread::sleep_for(std::chrono::seconds(1)); // Simulate a pause
    robot.turnLeft(); // Turn left
    std::this_thread::sleep_for(std::chrono::seconds(1)); // Simulate a pause
    robot.moveForward(5); // Move forward 5 units
    std::this_thread::sleep_for(std::chrono::seconds(1)); // Simulate a pause
    robot.turnRight(); // Turn right
    std::this_thread::sleep_for(std::chrono::seconds(1)); // Simulate a pause
    robot.moveForward(7); // Move forward 7 units

    return 0;
}
