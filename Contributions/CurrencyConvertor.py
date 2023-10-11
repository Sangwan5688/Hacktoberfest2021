!pip install forex-python

from forex_python.converter import CurrencyRates

def convert_currency():
    c = CurrencyRates()
    
    # Input currency and amount
    from_currency = input("Enter the source currency (e.g., USD): ").upper()
    amount = float(input("Enter the amount to convert: "))
    
    # Output currency
    to_currency = input("Enter the target currency (e.g., EUR): ").upper()
    
    try:
        # Convert the currency
        converted_amount = c.convert(from_currency, to_currency, amount)
        print(f"{amount} {from_currency} is equal to {converted_amount} {to_currency}")
    except ValueError as e:
        print(f"Conversion failed: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    convert_currency()
