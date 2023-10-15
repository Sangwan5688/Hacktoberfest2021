class TodoList:
    def __init__(self):
        self.tasks = []

    def add_task(self, task):
        self.tasks.append({"task": task, "completed": False})

    def mark_completed(self, task_index):
        if 0 <= task_index < len(self.tasks):
            self.tasks[task_index]["completed"] = True
            print(f'Task "{self.tasks[task_index]["task"]}" marked as completed.')
        else:
            print("Invalid task index.")

    def view_tasks(self):
        if not self.tasks:
            print("No tasks in the todo list.")
        else:
            print("Todo List:")
            for i, task in enumerate(self.tasks):
                status = "Completed" if task["completed"] else "Not Completed"
                print(f'{i + 1}. {task["task"]} - {status}')

def main():
    todo_list = TodoList()

    while True:
        print("\nTodo List Menu:")
        print("1. Add Task")
        print("2. Mark Task as Completed")
        print("3. View Tasks")
        print("4. Exit")

        choice = input("Enter your choice (1-4): ")

        if choice == "1":
            task = input("Enter the task: ")
            todo_list.add_task(task)
            print(f'Task "{task}" added to the todo list.')
        elif choice == "2":
            task_index = int(input("Enter the task index to mark as completed: ")) - 1
            todo_list.mark_completed(task_index)
        elif choice == "3":
            todo_list.view_tasks()
        elif choice == "4":
            print("Exiting the Todo List program. Goodbye!")
            break
        else:
            print("Invalid choice. Please enter a number between 1 and 4.")

if __name__ == "__main__":
    main()
