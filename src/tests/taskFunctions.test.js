// taskFunctions.test.js

// Import the updateIndexes function
import { updateIndexes } from '../modules/taskFunctions.js';

describe('updateIndexes', () => {
  // Create a mock HTML structure for testing
  document.body.innerHTML = `
    <ul id="taskList">
      <li data-index="1">Task 1</li>
      <li data-index="2">Task 2</li>
      <li data-index="3">Task 3</li>
    </ul>
  `;

  // Get the task list element
  const taskList = document.getElementById('taskList');

  test('updates the data-index attribute of list items', () => {
    // Call the updateIndexes function
    updateIndexes(taskList);

    // Check if the data-index attributes are updated correctly
    const taskItems = taskList.querySelectorAll('li');
    expect(taskItems[0].dataset.index).toBe('1');
    expect(taskItems[1].dataset.index).toBe('2');
    expect(taskItems[2].dataset.index).toBe('3');
  });
});
