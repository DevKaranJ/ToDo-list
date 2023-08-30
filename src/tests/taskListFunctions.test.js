import { addTaskToList } from '../modules/taskListFunctions.js';

describe('addTaskToList', () => {
  test('adds a task to the list', () => {
    // Create a mock taskList element
    const taskList = document.createElement('ul');

    // Call the addTaskToList function
    addTaskToList(taskList, 'New Task', 0);

    // Check if the task was added correctly
    const addedTask = taskList.querySelector('li');
    expect(addedTask).not.toBeNull();
    const taskTextSpan = addedTask.querySelector('span');
    expect(taskTextSpan.textContent).toBe('New Task');
    const deleteButton = addedTask.querySelector('.delete-button');
    expect(deleteButton.dataset.index).toBe('0');
  });
});
