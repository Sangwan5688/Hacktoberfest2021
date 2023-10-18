use std::io;

fn main() {
    println!("Enter your name:");

    let mut name = String::new();

    io::stdin().read_line(&mut name)
        .expect("Failed to read line");

    // Trim any whitespace or newline characters from the input
    let name = name.trim();

    println!("Hello, {}! Nice to meet you!", name);
}
