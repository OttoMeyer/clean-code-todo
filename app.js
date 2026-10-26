//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('incompleteTasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskString) {
  const listItem = createElement('li');
  const checkBox = createElement('input', { type: 'checkbox' });
  const label = createElement('label', { innerText: taskString, className: 'task' });
  const editInput = createElement('input', { type: 'text', className: 'task' });
  const editButton = createElement('button', { innerText: 'Edit', className: 'edit' });

  const deleteButton = createElement('button', { className: 'delete' });
  const deleteButtonImg = createElement('img');
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const createElement = function (elementName, parameters = null) {
  const element = document.createElement(elementName);
  if (parameters?.innerText) {
    element.innerText = parameters.innerText;
  }
  if (parameters?.type) {
    element.type = parameters.type;
  }
  if (parameters?.className) {
    element.className = parameters.className;
  }
  return element;
};

const addNewTask = function () {
  if (!taskInput.value) return;
  const taskListItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(taskListItem);
  bindTaskEvents(taskListItem, markTaskCompleted);

  taskInput.value = '';
};

const editTask = function () {
  const taskListItem = this.parentNode;

  const editInput = taskListItem.querySelector('input[type=text]');
  const label = taskListItem.querySelector('label');
  const editButton = taskListItem.querySelector('.edit');
  const isEditMode = taskListItem.classList.contains('editMode');

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  taskListItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const taskListItem = this.parentNode;
  const taskHolder = taskListItem.parentNode;
  taskHolder.removeChild(taskListItem);
};

const markTaskCompleted = function () {
  const taskListItem = this.parentNode;
  completedTasksHolder.appendChild(taskListItem);
  bindTaskEvents(taskListItem, markTaskIncomplete);
};

const markTaskIncomplete = function () {
  const taskListItem = this.parentNode;
  incompleteTaskHolder.appendChild(taskListItem);
  bindTaskEvents(taskListItem, markTaskCompleted);
};

//The glue to hold it all together.

addButton.onclick = addNewTask;
addButton.addEventListener('click', addNewTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], markTaskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], markTaskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
