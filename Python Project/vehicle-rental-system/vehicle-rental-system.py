import json
import datetime

# Define a list to store vehicle information
vehicles = []

# Define a list to store user information
users = []

# Define a list to store reservations
reservations = []

def save_data():
    with open("data.json", "w") as file:
        data = {
            "vehicles": vehicles,
            "users": users,
            "reservations": reservations
        }
        json.dump(data, file)

def load_data():
    global vehicles, users, reservations
    try:
        with open("data.json", "r") as file:
            data = json.load(file)
            vehicles = data["vehicles"]
            users = data["users"]
            reservations = data["reservations"]
    except FileNotFoundError:
        pass

def show_available_vehicles():
    print("Available Vehicles:")
    for vehicle in vehicles:
        if not is_reserved(vehicle):
            print(f"{vehicle['id']}: {vehicle['name']} - ${vehicle['price']}/hour")

def is_reserved(vehicle):
    now = datetime.datetime.now()
    for res in reservations:
        if res["vehicle_id"] == vehicle["id"]:
            start_time = datetime.datetime.fromisoformat(res["start_time"])
            end_time = datetime.datetime.fromisoformat(res["end_time"])
            if start_time <= now < end_time:
                return True
    return False

def register():
    name = input("Enter your name: ")
    email = input("Enter your email: ")
    password = input("Create a password: ")
    user = {
        "name": name,
        "email": email,
        "password": password
    }
    users.append(user)
    save_data()
    print("Registration successful!")

def login():
    email = input("Enter your email: ")
    password = input("Enter your password: ")
    for user in users:
        if user["email"] == email and user["password"] == password:
            print(f"Welcome, {user['name']}!")
            return user
    print("Login failed. Please check your credentials.")
    return None

def book_vehicle(user):
    vehicle_id = input("Enter the ID of the vehicle you want to book: ")
    vehicle = next((v for v in vehicles if v["id"] == int(vehicle_id)), None)
    if vehicle:
        if not is_reserved(vehicle):
            start_time = datetime.datetime.now().isoformat()
            end_time = (datetime.datetime.now() + datetime.timedelta(hours=1)).isoformat()
            reservation = {
                "user_id": users.index(user),
                "vehicle_id": vehicle["id"],
                "start_time": start_time,
                "end_time": end_time
            }
            reservations.append(reservation)
            save_data()
            print(f"Booking confirmed for {vehicle['name']} for 1 hour.")
        else:
            print("Sorry, this vehicle is already booked.")
    else:
        print("Invalid vehicle ID.")

def main():
    load_data()
    while True:
        print("\n1. Register")
        print("2. Login")
        print("3. Show Available Vehicles")
        print("4. Book a Vehicle")
        print("5. Exit")
        choice = input("Enter your choice: ")

        if choice == "1":
            register()
        elif choice == "2":
            user = login()
            if user:
                show_available_vehicles()
                book_vehicle(user)
        elif choice == "3":
            show_available_vehicles()
        elif choice == "4":
            if users:
                show_available_vehicles()
                book_vehicle(users[0])
            else:
                print("No users registered. Please register first.")
        elif choice == "5":
            save_data()
            print("Thank you for using the Vehicle Rental System. Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()

