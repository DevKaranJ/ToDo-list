// editFunctions.js
export function enableTaskEditing(taskText) {
  taskText.contentEditable = true;
  taskText.focus();
}

export function saveTaskEdit(taskText) {
  taskText.contentEditable = false;
}
