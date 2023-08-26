// taskFunctions.js
export function saveTasksToLocalStorage(taskList) {
  const tasks = [];
  const taskItems = taskList.querySelectorAll('li');
  taskItems.forEach((taskItem, index) => {
    const text = taskItem.querySelector('span').textContent;
    const completed = false;
    tasks.push({ index: index + 1, text, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to update indexes after deleting a task
export function updateIndexes(taskList) {
  const taskItems = taskList.querySelectorAll('li');
  taskItems.forEach((taskItem, index) => {
    taskItem.dataset.index = index + 1;
  });
}
