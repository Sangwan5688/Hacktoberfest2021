#include <stdio.h>
#include <stdlib.h>

// Structure to store student information
struct Student {
    char name[50];
    int rollNumber;
    float marks[5];
    float totalMarks;
    float percentage;
    char grade;
};

// Function to calculate the grade based on the percentage
char calculateGrade(float percentage) {
    if (percentage >= 90) {
        return 'A';
    } else if (percentage >= 80) {
        return 'B';
    } else if (percentage >= 70) {
        return 'C';
    } else if (percentage >= 60) {
        return 'D';
    } else {
        return 'F';
    }
}

int main() {
    int numStudents;

    printf("Enter the number of students: ");
    scanf("%d", &numStudents);

    struct Student students[numStudents];

    for (int i = 0; i < numStudents; i++) {
        printf("Enter the details of student %d:\n", i + 1);
        printf("Name: ");
        scanf("%s", students[i].name);
        printf("Roll Number: ");
        scanf("%d", &students[i].rollNumber);
        students[i].totalMarks = 0;

        printf("Enter marks for 5 subjects:\n");
        for (int j = 0; j < 5; j++) {
            printf("Subject %d: ", j + 1);
            scanf("%f", &students[i].marks[j]);
            students[i].totalMarks += students[i].marks[j];
        }

        students[i].percentage = (students[i].totalMarks / 500) * 100;
        students[i].grade = calculateGrade(students[i].percentage);
    }

    // Display student results
    printf("\nStudent Results:\n");
    for (int i = 0; i < numStudents; i++) {
        printf("Student %d\n", i + 1);
        printf("Name: %s\n", students[i].name);
        printf("Roll Number: %d\n", students[i].rollNumber);
        printf("Total Marks: %.2f\n", students[i].totalMarks);
        printf("Percentage: %.2f%%\n", students[i].percentage);
        printf("Grade: %c\n", students[i].grade);
        printf("\n");
    }

    return 0;
}
