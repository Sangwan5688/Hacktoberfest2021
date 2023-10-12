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
