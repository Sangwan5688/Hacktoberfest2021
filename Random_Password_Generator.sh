#!/bin/bash

# Function to generate a random password
generate_password() {
    local length="$1"
    tr -dc 'A-Za-z0-9' </dev/urandom | head -c "$length"
}

# Prompt the user for password length
read -p "Enter the password length: " password_length

# Generate and print the random password
random_password=$(generate_password "$password_length")
echo "Random Password: $random_password"
