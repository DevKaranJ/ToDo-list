// checkboxes.js
import { saveTasksToLocalStorage } from './taskFunctions.js';

export function addCheckboxFunctionality(taskList) {
  taskList.addEventListener('change', (event) => {
    if (event.target.classList.contains('task-checkbox')) {
      const listItem = findParentListItem(event.target);
      if (listItem) {
        const taskText = listItem.querySelector('.task-item span');
      
        // Update the completed key in the local storage data
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        const taskIndex = Array.from(taskList.querySelectorAll('li')).indexOf(listItem);
        tasks[taskIndex].completed = event.target.checked;
        localStorage.setItem('tasks', JSON.stringify(tasks));

        taskText.classList.toggle('completed', event.target.checked);

        saveTasksToLocalStorage(taskList);
      }
    }
  });
}

export function addClearCompletedFunctionality(taskList) {
  const clearButton = document.getElementById('delete-selected');

  clearButton.addEventListener('click', () => {
    const completedTasks = Array.from(taskList.querySelectorAll('.completed'));

    completedTasks.forEach((task) => {
      const listItem = findParentListItem(task);
      if (listItem) {
        listItem.remove();
      }
    });

    saveTasksToLocalStorage(taskList);

    const allTasks = Array.from(taskList.querySelectorAll('li'));

    const activeTasks = allTasks.filter((task) => !task.querySelector('.task-checkbox').checked);

    taskList.innerHTML = '';
    activeTasks.forEach((task) => {
      taskList.appendChild(task);
    });

    saveTasksToLocalStorage(taskList);
  });
}

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
