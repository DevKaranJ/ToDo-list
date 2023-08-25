// main.js
import './style.css';
import { saveTasksToLocalStorage, updateIndexes } from './modules/taskFunctions.js';
import { addTaskToList, updateTaskTextDecoration, deleteSelectedTasks } from './modules/taskListFunctions.js';
import { enableTaskEditing, saveTaskEdit } from './modules/editFunctions.js';

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const deleteSelectedButton = document.getElementById('delete-selected');

// Save data to local storage on page load
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
savedTasks.forEach((savedTask) => {
  addTaskToList(taskList, savedTask.text);
  const taskItems = taskList.querySelectorAll('li');
  const checkbox = taskItems[taskItems.length - 1].querySelector("input[type='checkbox']");
  if (savedTask.completed) {
    checkbox.checked = true;
    updateTaskTextDecoration(checkbox, savedTask.text);
  }
});

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const newIndex = taskList.children.length + 1;
  addTaskToList(taskList, taskText, newIndex);

  taskInput.value = '';

  saveTasksToLocalStorage(taskList);
});

taskList.addEventListener('change', (event) => {
  if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
    const taskText = event.target.nextElementSibling;
    updateTaskTextDecoration(event.target, taskText);
    saveTasksToLocalStorage(taskList);
  }
});

deleteSelectedButton.addEventListener('click', () => {
  deleteSelectedTasks(taskList);

  // After deleting, update indexes
  updateIndexes(taskList);
  saveTasksToLocalStorage(taskList);
});

taskList.addEventListener('dblclick', (event) => {
  if (event.target.tagName === 'SPAN') {
    const taskText = event.target;

    enableTaskEditing(taskText);

    taskText.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        saveTaskEdit(taskText);
        saveTasksToLocalStorage(taskList);
      }
    });

    taskText.addEventListener('blur', () => {
      saveTaskEdit(taskText);
      saveTasksToLocalStorage(taskList);
    });
  }
});

// Adding delete button functionality
taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-button')) {
    const listItem = findParentListItem(event.target);
    if (listItem) {
      taskList.removeChild(listItem);

      // After deleting, update indexes
      updateIndexes(taskList);
      saveTasksToLocalStorage(taskList);
    }
  }
});

function findParentListItem(element) {
  let parent = element.parentElement;
  while (parent !== null) {
    if (parent.tagName === 'LI') {
      return parent;
    }
    parent = parent.parentElement;
  }
  return null;
}
