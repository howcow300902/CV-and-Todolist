const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

addButton.addEventListener('click', () => {
	if (todoInput.value !== '') {
		const newTodo = document.createElement('li');
		const todoText = document.createElement('span');
		const deleteButton = document.createElement('button');
		todoText.textContent = todoInput.value;
		deleteButton.textContent = 'Delete';
		newTodo.appendChild(todoText);
		newTodo.appendChild(deleteButton);
		todoList.appendChild(newTodo);
		todoInput.value = '';
		deleteButton.addEventListener('click', () => {
			todoList.removeChild(newTodo);
		});
	}
});
