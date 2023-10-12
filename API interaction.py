import requests

api_key = 'your_api_key'
city = 'New York'
url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}'
response = requests.get(url)
weather_data = response.json()

temperature = weather_data['main']['temp']
print(f'Temperature in {city}: {temperature} K')
