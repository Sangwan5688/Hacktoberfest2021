#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Structure to represent a task
struct Task {
    int id;
    char description[100];
    int isComplete;
};

// Function to add a new task
void addTask(struct Task tasks[], int *taskCount, char description[]) {
    struct Task newTask;
    newTask.id = (*taskCount) + 1;
    strcpy(newTask.description, description);
    newTask.isComplete = 0; // Task is initially incomplete

    tasks[*taskCount] = newTask;
    (*taskCount)++;

    printf("Task added successfully!\n");
}

// Function to list all tasks
void listTasks(struct Task tasks[], int taskCount) {
    if (taskCount == 0) {
        printf("No tasks found.\n");
        return;
    }

    printf("Task List:\n");
    for (int i = 0; i < taskCount; i++) {
        printf("%d. %s (%s)\n", tasks[i].id, tasks[i].description,
               tasks[i].isComplete ? "Complete" : "Incomplete");
    }
}

// Function to mark a task as complete
void completeTask(struct Task tasks[], int taskCount, int taskId) {
    for (int i = 0; i < taskCount; i++) {
        if (tasks[i].id == taskId) {
            tasks[i].isComplete = 1;
            printf("Task %d marked as complete.\n", taskId);
            return;
        }
    }

    printf("Task not found.\n");
}

int main() {
    struct Task tasks[100]; // Array to store tasks
    int taskCount = 0;

    while (1) {
        printf("\nTask Manager\n");
        printf("1. Add Task\n");
        printf("2. List Tasks\n");
        printf("3. Mark Task as Complete\n");
        printf("4. Exit\n");
        printf("Enter your choice: ");

        int choice;
        scanf("%d", &choice);

        switch (choice) {
            case 1: {
                char description[100];
                printf("Enter task description: ");
                scanf(" %[^\n]", description);
                addTask(tasks, &taskCount, description);
                break;
            }
            case 2:
                listTasks(tasks, taskCount);
                break;
            case 3: {
                int taskId;
                printf("Enter the task ID to mark as complete: ");
                scanf("%d", &taskId);
                completeTask(tasks, taskCount, taskId);
                break;
            }
            case 4:
                printf("Exiting Task Manager. Goodbye!\n");
                exit(0);
            default:
                printf("Invalid choice. Please try again.\n");
        }
    }

    return 0;
}
