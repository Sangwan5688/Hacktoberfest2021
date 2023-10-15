let tasks = [];

function showTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '<h3>Tasks</h3>';

    for (let i = 0; i < tasks.length; i++) {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `<p onclick="showTaskDetails(${i})">${tasks[i].title}</p>`;
        taskList.appendChild(taskItem);
    }
}

function showTaskDetails(index) {
    const taskDetails = document.getElementById('taskDetails');
    const selectedTask = tasks[index];

    if (selectedTask) {
        taskDetails.innerHTML = `
            <h3>${selectedTask.title}</h3>
            <p>Description: ${selectedTask.description}</p>
            <p>Due Date: ${selectedTask.dueDate}</p>
            <button onclick="deleteTask(${index})">Delete Task</button>
        `;
    }
}

function showAddTaskForm() {
    const taskDetails = document.getElementById('taskDetails');
    taskDetails.innerHTML = ''; // Clear task details when showing the add task form

    const addTaskForm = document.createElement('div');
    addTaskForm.innerHTML = `
        <h3>Add New Task</h3>
        <label for="taskTitle">Title:</label>
        <input type="text" id="taskTitle">
        <label for="taskDescription">Description:</label>
        <textarea id="taskDescription"></textarea>
        <label for="dueDate">Due Date:</label>
        <input type="date" id="dueDate">
        <button onclick="addTask()">Save Task</button>
    `;
    taskDetails.appendChild(addTaskForm);
}

function addTask() {
    const taskTitle = document.getElementById('taskTitle').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('dueDate').value;

    if (taskTitle && dueDate) {
        tasks.push({ title: taskTitle, description: taskDescription, dueDate: dueDate });
        showTasks();
        resetAddTaskForm();
    }
}

function resetAddTaskForm() {
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('dueDate').value = '';
    document.getElementById('taskDetails').innerHTML = ''; // Clear add task form
}

function deleteTask(index) {
    tasks.splice(index, 1);
    showTasks();
}

showTasks();
