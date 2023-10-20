import datetime

class Book:
    def __init__(self, id, title, author, genre, publication_date):
        self.id = id
        self.title = title
        self.author = author
        self.genre = genre
        self.publication_date = publication_date
        self.status = "Available"

class Member:
    def __init__(self, id, name, address, phone_number):
        self.id = id
        self.name = name
        self.address = address
        self.phone_number = phone_number
        self.books_checked_out = []

class Library:
    def __init__(self):
        self.books = []
        self.members = []

    def add_book(self, book):
        self.books.append(book)

    def add_member(self, member):
        self.members.append(member)

    def checkout_book(self, member_id, book_id):
        member = self.get_member_by_id(member_id)
        book = self.get_book_by_id(book_id)

        if book.status == "Available":
            book.status = "Checked out"
            member.books_checked_out.append(book)
            return True
        else:
            return False

    def return_book(self, member_id, book_id):
        member = self.get_member_by_id(member_id)
        book = self.get_book_by_id(book_id)

        if book in member.books_checked_out:
            book.status = "Available"
            member.books_checked_out.remove(book)
            return True
        else:
            return False

    def get_member_by_id(self, member_id):
        for member in self.members:
            if member.id == member_id:
                return member

    def get_book_by_id(self, book_id):
        for book in self.books:
            if book.id == book_id:
                return book


# Example usage:

library = Library()

# Add some books to the library
library.add_book(Book(1, "The Hitchhiker's Guide to the Galaxy", "Douglas Adams", "Science Fiction", datetime.datetime(1979, 10, 12)))
library.add_book(Book(2, "The Lord of the Rings", "J.R.R. Tolkien", "Fantasy", datetime.datetime(1954, 9, 29)))
library.add_book(Book(3, "Harry Potter and the Sorcerer's Stone", "J.K. Rowling", "Fantasy", datetime.datetime(1997, 6, 26)))

# Add some members to the library
library.add_member(Member(1, "Alice", "123 Main Street", "123-456-7890"))
library.add_member(Member(2, "Bob", "456 Elm Street", "987-654-3210"))
library.add_member(Member(3, "Carol", "789 Oak Street", "456-789-0123"))

# Checkout a book
library.checkout_book(1, 2)

# Return a book
library.return_book(1, 2)

# Print the status of all books
for book in library.books:
    print(f"{book.id}: {book.title} - {book.status}")
