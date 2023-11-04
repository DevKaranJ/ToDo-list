import { enableTaskEditing, saveTaskEdit } from '../modules/editFunctions.js';

// Create a mock for the 'localStorage' object to simulate storage operations.
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

// Mock 'localStorage' using Jest's spyOn
beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    configurable: true,
    writable: true,
  });
});

// Mock a DOM element with an ID of 'taskText'.
document.body.innerHTML = '<div id="taskText" contentEditable="false">Task Description</div>';
const taskTextElement = document.getElementById('taskText');

// Group tests related to the 'Editing Functions'.
describe('Editing Functions', () => {
  // Clear mock function calls before each test to isolate them.
  beforeEach(() => jest.clearAllMocks());

  // Test the 'enableTaskEditing' function.
  describe('enableTaskEditing', () => {
    it('enables editing and focuses', () => {
      const focusSpy = jest.spyOn(taskTextElement, 'focus'); // Spy on the focus method
      enableTaskEditing(taskTextElement);
      expect(taskTextElement.contentEditable).toBe(true);
      expect(focusSpy).toHaveBeenCalled(); // Use the spy to check if focus was called
    });
  });

  // Test the 'saveTaskEdit' function.
  describe('saveTaskEdit', () => {
    it('disables editing', () => {
      saveTaskEdit(taskTextElement);
      expect(taskTextElement.contentEditable).toBe(false);
    });
  });
});
