import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

void main() async {
  print("Weather Information App");
  stdout.write("Enter a city name: ");
  var city = stdin.readLineSync();

  if (city != null && city.isNotEmpty) {
    try {
      final apiKey = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key
      final url = 'http://api.openweathermap.org/data/2.5/weather?q=$city&appid=$apiKey';

      final response = await http.get(Uri.parse(url));

      if (response.statusCode == 200) {
        final jsonData = jsonDecode(response.body);
        final cityName = jsonData['name'];
        final weatherDescription = jsonData['weather'][0]['description'];
        final temperature = (jsonData['main']['temp'] - 273.15).toStringAsFixed(1);

        print("City: $cityName");
        print("Weather: $weatherDescription");
        print("Temperature: $temperature°C");
      } else {
        print("Error: Unable to fetch weather data.");
      }
    } catch (e) {
      print("Error: $e");
    }
  } else {
    print("City name cannot be empty.");
  }
}
