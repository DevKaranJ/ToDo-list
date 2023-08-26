// checkboxes.js
import { saveTasksToLocalStorage } from './taskFunctions.js';

// Add checkbox functionality to tasks
export function addCheckboxFunctionality(taskList) {
    taskList.addEventListener('change', (event) => {
        if (event.target.classList.contains('task-checkbox')) {
          const listItem = findParentListItem(event.target);
          if (listItem) {
            const taskText = listItem.querySelector('.task-item span'); // Updated selector
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
      
      completedTasks.forEach(task => {
          const listItem = findParentListItem(task);
          if (listItem) {
              listItem.remove();
          }
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
