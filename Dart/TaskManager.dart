import 'dart:io';

void main() {
  var tasks = <String>[];

  print("Dart To-Do List");
  while (true) {
    print("Options:");
    print("1. Add a task");
    print("2. List tasks");
    print("3. Mark task as done");
    print("4. Quit");
    stdout.write("Enter your choice: ");
    var choice = stdin.readLineSync();

    switch (choice) {
      case '1':
        stdout.write("Enter a task: ");
        var task = stdin.readLineSync();
        tasks.add(task!);
        break;
      case '2':
        if (tasks.isEmpty) {
          print("No tasks in the list.");
        } else {
          for (var i = 0; i < tasks.length; i++) {
            print("$i. ${tasks[i]}");
          }
        }
        break;
      case '3':
        if (tasks.isEmpty) {
          print("No tasks in the list.");
        } else {
          stdout.write("Enter the task number to mark as done: ");
          var taskNumber = int.parse(stdin.readLineSync()!);
          if (taskNumber >= 0 && taskNumber < tasks.length) {
            print("Task '${tasks[taskNumber]}' marked as done.");
            tasks.removeAt(taskNumber);
          } else {
            print("Invalid task number.");
          }
        }
        break;
      case '4':
        print("Goodbye!");
        return;
      default:
        print("Invalid choice. Please try again.");
    }
  }
}
