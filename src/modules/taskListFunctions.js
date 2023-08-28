// taskListFunctions.js
export function addTaskToList(taskList, taskText, index) {
  const li = document.createElement('li');
  const newIndex = taskList.children.length + 1;
  li.innerHTML = `
    <div class="task-item">
      <input type="checkbox" class="task-checkbox">
      <span>${taskText}</span>
      <button class="delete-button" data-index="${index}">Delete</button>
    </div>
  `;
  li.dataset.index = newIndex;

  taskList.appendChild(li);
}
