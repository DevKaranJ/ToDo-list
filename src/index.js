import './style.css';

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const deleteSelectedButton = document.getElementById('delete-selected');

function saveTasksToLocalStorage() {
  const tasks = [];
  const taskItems = taskList.querySelectorAll('li');
  taskItems.forEach((taskItem) => {
    const checkbox = taskItem.querySelector("input[type='checkbox']");
    const text = taskItem.querySelector('span').textContent;
    const completed = checkbox.checked;
    tasks.push({ text, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// save data on local storage
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
savedTasks.forEach((savedTask) => {
  const li = document.createElement('li');
  li.innerHTML = `
    <input type="checkbox" ${savedTask.completed ? 'checked' : ''}>
    <span>${savedTask.text}</span>
  `;
  taskList.appendChild(li);
});

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.innerHTML = `
    <input type="checkbox">
    <span>${taskText}</span>
  `;
  taskList.appendChild(li);

  taskInput.value = '';

  saveTasksToLocalStorage();
});

taskList.addEventListener('change', (event) => {
  if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
    const taskText = event.target.nextElementSibling;
    taskText.style.textDecoration = event.target.checked ? 'line-through' : 'none';
    saveTasksToLocalStorage();
  }
});

deleteSelectedButton.addEventListener('click', () => {
  const selectedCheckboxes = taskList.querySelectorAll('input[type="checkbox"]:checked');
  selectedCheckboxes.forEach((checkbox) => {
    const listItem = checkbox.parentElement;
    taskList.removeChild(listItem);
  });

  saveTasksToLocalStorage();
});
