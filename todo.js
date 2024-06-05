document.addEventListener('DOMContentLoaded', (event) => {
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
        });
    });
});

function addTask() {
    const taskText = document.getElementById('new-task').value;
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
        <span class="status">Tasks</span>
    `;

    document.getElementById('tasks-container').appendChild(task);
    document.getElementById('new-task').value = '';
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
}
