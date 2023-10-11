#include <iostream>
#include <map>

class WeatherInfo {
public:
    WeatherInfo(const std::string& location, double temperature, const std::string& conditions)
        : location(location), temperature(temperature), conditions(conditions) {}

    void displayInfo() const {
        std::cout << "Location: " << location << std::endl;
        std::cout << "Temperature: " << temperature << "°C" << std::endl;
        std::cout << "Conditions: " << conditions << std::endl;
    }

private:
    std::string location;
    double temperature;
    std::string conditions;
};

class WeatherSystem {
public:
    void addLocationInfo(const std::string& location, double temperature, const std::string& conditions) {
        WeatherInfo info(location, temperature, conditions);
        weatherInfoMap[location] = info;
        std::cout << "Weather information added for " << location << std::endl;
    }

    void displayLocationInfo(const std::string& location) const {
        if (weatherInfoMap.find(location) != weatherInfoMap.end()) {
            weatherInfoMap.at(location).displayInfo();
        } else {
            std::cout << "Weather information not found for " << location << std::endl;
        }
    }

    void listAllLocations() const {
        std::cout << "Locations with Weather Information:" << std::endl;
        for (const auto& entry : weatherInfoMap) {
            std::cout << entry.first << std::endl;
        }
    }

private:
    std::map<std::string, WeatherInfo> weatherInfoMap;
};

int main() {
    WeatherSystem weatherSystem;

    while (true) {
        std::cout << "\nWeather Information System" << std::endl;
        std::cout << "1. Add Location Information" << std::endl;
        std::cout << "2. Display Location Information" << std::endl;
        std::cout << "3. List All Locations" << std::endl;
        std::cout << "4. Quit" << std::endl;
        std::cout << "Enter your choice: ";

        int choice;
        std::cin >> choice;

        switch (choice) {
            case 1: {
                std::string location, conditions;
                double temperature;

                std::cout << "Enter location: ";
                std::cin >> location;

                std::cout << "Enter temperature (in °C): ";
                std::cin >> temperature;

                std::cin.ignore(); // Consume newline character

                std::cout << "Enter weather conditions: ";
                std::getline(std::cin, conditions);

                weatherSystem.addLocationInfo(location, temperature, conditions);
                break;
            }
            case 2: {
                std::string location;
                std::cout << "Enter location to display information: ";
                std::cin >> location;
                weatherSystem.displayLocationInfo(location);
                break;
            }
            case 3:
                weatherSystem.listAllLocations();
                break;
            case 4:
                std::cout << "Exiting the Weather Information System. Goodbye!" << std::endl;
                return 0;
            default:
                std::cout << "Invalid choice. Please try again." << std::endl;
        }
    }

    return 0;
}
