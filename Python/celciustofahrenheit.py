try:
    degrees_in_celcius = float(input("What is the temperature in Celcius?: "))

    def C2F_Converter():
            
        degrees_in_fahrenheit = (degrees_in_celcius * 9/5) + 32
            
        return degrees_in_fahrenheit

    print(C2F_Converter(),"F")

except ValueError:
    print("This is not a number.")


