// script.js
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();

  // Event listener for adding new tasks
  document.querySelectorAll(".add-task-btn").forEach((button) => {
    button.addEventListener("click", addTask);
  });
});

function addTask(event) {
  const dayContainer = event.target.closest(".day");
  const dayName = dayContainer.dataset.day;
  const taskInput = dayContainer.querySelector(".task-input");
  const taskList = dayContainer.querySelector(".task-list");

  const taskText = taskInput.value.trim();
  if (taskText) {
    const taskItem = createTaskItem(taskText);
    taskList.appendChild(taskItem);
    taskInput.value = "";
    saveTasks();
  }
}

function createTaskItem(text) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.addEventListener("change", saveTasks);

  const taskSpan = document.createElement("span");
  taskSpan.textContent = text;
  taskSpan.className = "task-text";
  taskSpan.contentEditable = true;
  taskSpan.addEventListener("input", saveTasks);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-task-btn";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(checkbox);
  li.appendChild(taskSpan);
  li.appendChild(deleteBtn);

  return li;
}

function saveTasks() {
  const tasksByDay = {};
  document.querySelectorAll(".day").forEach((dayContainer) => {
    const dayName = dayContainer.dataset.day;
    const tasks = [];
    dayContainer.querySelectorAll(".task-list li").forEach((taskItem) => {
      const text = taskItem.querySelector(".task-text").textContent;
      const checked = taskItem.querySelector(".task-checkbox").checked;
      tasks.push({ text, checked });
    });
    tasksByDay[dayName] = tasks;
  });
  localStorage.setItem("weeklyTasks", JSON.stringify(tasksByDay));
}

function loadTasks() {
  const tasksByDay = JSON.parse(localStorage.getItem("weeklyTasks")) || {};
  document.querySelectorAll(".day").forEach((dayContainer) => {
    const dayName = dayContainer.dataset.day;
    const taskList = dayContainer.querySelector(".task-list");
    taskList.innerHTML = ""; // Clear existing tasks
    const tasks = tasksByDay[dayName] || [];
    tasks.forEach((task) => {
      const taskItem = createTaskItem(task.text);
      taskItem.querySelector(".task-checkbox").checked = task.checked;
      taskList.appendChild(taskItem);
    });
  });
}




