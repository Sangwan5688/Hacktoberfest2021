import sqlite3

# Create a SQLite database
conn = sqlite3.connect('example.db')
cursor = conn.cursor()

# Create a table
cursor.execute('''CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)''')

# Insert data
cursor.execute("INSERT INTO users (name, age) VALUES (?, ?)", ('John Doe', 30))
conn.commit()

# Read data
cursor.execute("SELECT * FROM users")
rows = cursor.fetchall()
print("Database Content:")
for row in rows:
    print(row)

# Update data
cursor.execute("UPDATE users SET age=? WHERE name=?", (35, 'John Doe'))
conn.commit()

# Delete data
cursor.execute("DELETE FROM users WHERE name=?", ('John Doe',))
conn.commit()

# Close the database connection
conn.close()
