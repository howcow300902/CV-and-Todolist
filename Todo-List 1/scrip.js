// Select DOM elements
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const taskCount = document.querySelector("#taskCount");
const addButton = document.querySelector("#addButton");
const clearButton = document.querySelector("#clearButton");
// Toggle task completion when checkbox is clicked
function toggleTaskCompletion() {
  const task = this.parentNode;
  const isCompleted = this.checked;
  if (isCompleted) {
    task.classList.add("completed");
  } else {
    task.classList.remove("completed");
  }
  updateTaskCount();
}

taskList.addEventListener("change", function(event) {
  if (event.target.classList.contains("task-checkbox")) {
    toggleTaskCompletion.call(event.target);
  }
});

// Add a new task
function addTask() {
  if (taskInput.value === "") {
    alert("Please enter a task!");
  } else {
    // Create a new task list item
    const li = document.createElement("li");
    li.innerHTML = taskInput.value;
    taskList.appendChild(li);
    taskInput.value = "";

    // Add a "completed" button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "✓";
    completedButton.classList.add("completed");
    li.appendChild(completedButton);

    // Add a "delete" button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "x";
    deleteButton.classList.add("delete");
    li.appendChild(deleteButton);

    // Update the task count
    updateTaskCount();
  }
}

// Update the task count
function updateTaskCount() {
  const count = taskList.children.length;
  const completedCount = document.querySelectorAll(".completed").length;
  const remainingCount = count - completedCount;

  let taskCountText = "";
  if (remainingCount === 1) {
    taskCountText = "1 task remaining";
  } else {
    taskCountText = `${remainingCount} tasks remaining`;
  }
  taskCount.innerHTML = taskCountText;
}

// Mark a task as completed
function completeTask() {
  this.parentNode.classList.toggle("completed");
  const task = this.parentNode;
  if (task.style.textDecoration === "line-through") {
    task.style.textDecoration = "none";
    taskList.prepend(task); // Move task to top of list
  } else {
    task.style.textDecoration = "line-through";
    taskList.appendChild(task); // Move task to bottom of list
  }
  updateTaskCount();
}

// Remove a task
function removeTask() {
  this.parentNode.remove();
  updateTaskCount();
}

// Clear all completed tasks
function clearCompleted() {
  const completedTasks = document.querySelectorAll(".completed");
  for (let i = 0; i < completedTasks.length; i++) {
    completedTasks[i].remove();
  }
  updateTaskCount();
}

// Event listeners
addButton.addEventListener("click", addTask);
clearButton.addEventListener("click", clearCompleted);
taskInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addButton.click();
  }
});
taskList.addEventListener("click", function(event) {
  if (event.target.classList.contains("completed")) {
    completeTask.call(event.target);
  } else if (event.target.classList.contains("delete")) {
    removeTask.call(event.target);
  }
});

// Initialize the task count
updateTaskCount();

