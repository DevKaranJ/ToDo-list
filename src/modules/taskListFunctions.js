// taskListFunctions.js
export function addTaskToList(taskList, taskText) {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox">
      <span>${taskText}</span>
    `;
    taskList.appendChild(li);
  }
  
  export function updateTaskTextDecoration(checkbox, taskText) {
    taskText.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
  }
  
  export function deleteSelectedTasks(taskList) {
    const selectedCheckboxes = taskList.querySelectorAll('input[type="checkbox"]:checked');
    selectedCheckboxes.forEach((checkbox) => {
      const listItem = checkbox.parentElement;
      taskList.removeChild(listItem);
    });
  }
  