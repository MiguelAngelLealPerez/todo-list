// Selección de elementos del DOM
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Evento para agregar tareas
taskForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita recargar la página

    const taskText = taskInput.value.trim();

    // Validación: no permitir tareas vacías
    if (taskText === "") {
        alert("Por favor, escribe una tarea.");
        return;
    }

    addTask(taskText);
    taskInput.value = "";
});

// Función para crear una tarea
function addTask(text) {
    const li = document.createElement("li");
    li.classList.add("task");

    const span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = text;

    const actions = document.createElement("div");
    actions.classList.add("task-actions");

    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");
    completeBtn.textContent = "✔";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "✖";

    // Marcar como completada
    completeBtn.addEventListener("click", function () {
        li.classList.toggle("completed");
    });

    // Eliminar tarea
    deleteBtn.addEventListener("click", function () {
        li.remove();
    });

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    taskList.appendChild(li);
}
