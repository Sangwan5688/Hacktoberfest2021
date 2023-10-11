import 'dart:io';

void main() {
  final notes = <String>[];

  print("Dart Note-taking App");
  while (true) {
    print("Options:");
    print("1. Add a note");
    print("2. List notes");
    print("3. Quit");
    stdout.write("Enter your choice: ");
    final choice = stdin.readLineSync();

    if (choice == "1") {
      stdout.write("Enter a note: ");
      final note = stdin.readLineSync();
      notes.add(note!);
      print("Note added: $note");
    } else if (choice == "2") {
      if (notes.isEmpty) {
        print("No notes in the list.");
      } else {
        print("Notes:");
        for (var i = 0; i < notes.length; i++) {
          print("$i. ${notes[i]}");
        }
      }
    } else if (choice == "3") {
      print("Exiting the Note-taking App.");
      break;
    } else {
      print("Invalid choice. Please try again.");
    }
  }
}
