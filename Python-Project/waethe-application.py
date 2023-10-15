import requests

def get_weather(city):
    api_key = "YOUR_API_KEY"  # Replace with a valid API key from OpenWeatherMap
    base_url = "http://api.openweathermap.org/data/2.5/weather"

    params = {
        "q": city,
        "appid": api_key,
        "units": "metric"  # You can change to "imperial" for Fahrenheit
    }

    try:
        response = requests.get(base_url, params=params)
        data = response.json()

        if response.status_code == 200:
            weather_description = data["weather"][0]["description"]
            temperature = data["main"]["temp"]
            print(f'Weather in {city}: {weather_description}, Temperature: {temperature}°C')
        else:
            print(f'Error: {data["message"]}')
    except Exception as e:
        print(f'An error occurred: {e}')

def main():
    print("Welcome to the Simple Weather App!")

    while True:
        city = input("Enter the city name (or 'exit' to quit): ")

        if city.lower() == 'exit':
            print("Exiting the Weather App. Goodbye!")
            break

        get_weather(city)

if __name__ == "__main__":
    main()
