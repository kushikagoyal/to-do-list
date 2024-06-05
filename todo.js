document.addEventListener('DOMContentLoaded', (event) => {
    loadTasksFromLocalStorage();

    document.querySelectorAll('.task-container').forEach(container => {
        container.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        container.addEventListener('drop', (e) => {
            e.preventDefault();
            const taskId = e.dataTransfer.getData('text');
            const task = document.getElementById(taskId);
            container.appendChild(task);
            updateTaskStatus(taskId, container.id);
            saveTasksToLocalStorage();
        });
    });
});

function addTask() {
    const taskText = document.getElementById('new-task').value;
    const dueDate = document.getElementById('due-date').value;
    if (taskText === '') return;

    const taskId = `task-${Date.now()}`;
    const task = document.createElement('div');
    task.className = 'task';
    task.id = taskId;
    task.draggable = true;
    task.ondragstart = (e) => {
        e.dataTransfer.setData('text', taskId);
    };
    task.innerHTML = `
        <span>${taskText}</span>
        <span class="due-date">Due: ${dueDate}</span>
        <span class="status">Tasks</span>
        <button class="delete-btn" onclick="deleteTask('${taskId}')">Delete</button>
    `;

    document.getElementById('tasks-container').appendChild(task);
    document.getElementById('new-task').value = '';
    document.getElementById('due-date').value = '';
    saveTasksToLocalStorage();
}

function updateTaskStatus(taskId, containerId) {
    const task = document.getElementById(taskId);
    const statusElement = task.querySelector('.status');
    
    if (containerId === 'tasks-container') {
        statusElement.innerText = 'Tasks';
    } else if (containerId === 'active-container') {
        statusElement.innerText = 'Active';
    } else if (containerId === 'resolved-container') {
        statusElement.innerText = 'Resolved';
    }
    saveTasksToLocalStorage();
}

function deleteTask(taskId) {
    const task = document.getElementById(taskId);
    task.parentElement.removeChild(task);
    saveTasksToLocalStorage();
}

function clearResolvedTasks() {
    const resolvedContainer = document.getElementById('resolved-container');
    resolvedContainer.innerHTML = '';
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const tasks = document.getElementById('tasks-container').innerHTML;
    const active = document.getElementById('active-container').innerHTML;
    const resolved = document.getElementById('resolved-container').innerHTML;
    
    localStorage.setItem('tasks', tasks);
    localStorage.setItem('active', active);
    localStorage.setItem('resolved', resolved);
}

function loadTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    const active = localStorage.getItem('active');
    const resolved = localStorage.getItem('resolved');
    
    if (tasks) document.getElementById('tasks-container').innerHTML = tasks;
    if (active) document.getElementById('active-container').innerHTML = active;
    if (resolved) document.getElementById('resolved-container').innerHTML = resolved;

    // Re-attach event listeners to tasks after loading from local storage
    document.querySelectorAll('.task').forEach(task => {
        task.ondragstart = (e) => {
            e.dataTransfer.setData('text', task.id);
        };
    });
}
