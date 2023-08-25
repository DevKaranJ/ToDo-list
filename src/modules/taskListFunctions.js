// taskListFunctions.js
export function addTaskToList(taskList, taskText, index) {
  const li = document.createElement('li');
  const newIndex = taskList.children.length + 1;
  li.innerHTML = `
  <div class="task-item">
      <input type="checkbox">
      <span>${taskText}</span>
      <button class="delete-button" data-index="${index}">Delete</button>
      </div>
      `;
  li.dataset.index = newIndex;

  taskList.appendChild(li);
}

export function updateTaskTextDecoration(checkbox, taskText) {
  taskText.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
}

export function deleteSelectedTasks(taskList) {
  const selectedCheckboxes = taskList.querySelectorAll('input[type="checkbox"]:checked');
  selectedCheckboxes.forEach((checkbox) => {
    const listItem = checkbox.closest('.task-item');
    if (listItem) {
      taskList.removeChild(listItem);
    }
  });

  updateIndexes(taskList);
}
