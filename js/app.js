const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const daySelect = document.getElementById("task-day");
const dateInput = document.getElementById("task-date");
const list = document.getElementById("task-list");
const pendingCount = document.getElementById("pending-count");
const filterButtons = document.querySelectorAll(".filters button");

let tasks = [];
let currentFilter = "all";

form.addEventListener("submit", e => {
    e.preventDefault();

    if (!input.value.trim() || !daySelect.value || !dateInput.value) {
        alert("Completa todos los campos");
        return;
    }

    tasks.push({
        text: input.value,
        day: daySelect.value,
        date: dateInput.value,
        completed: false
    });

    form.reset();
    render();
});

function render() {
    list.innerHTML = "";
    document.querySelectorAll(".day").forEach(d => {
        d.innerHTML = `<h4>${d.dataset.day}</h4>`;
    });

    const filtered = tasks.filter(task => {
        if (currentFilter === "completed") return task.completed;
        if (currentFilter === "pending") return !task.completed;
        return true;
    });

    filtered.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <span class="task-text">
                <strong>Tarea:</strong> ${task.text}<br>
                <strong>Fecha límite:</strong> ${task.day} ${task.date}
            </span>

            <div class="task-actions">
                <button class="complete-btn" onclick="toggleTask(${index})">✔</button>
                <span class="action-label">Completar</span>
                <button class="delete-btn" onclick="deleteTask(${index})">✖</button>
                <span class="action-label">Eliminar</span>
            </div>
        `;

        list.appendChild(li);

        if (!task.completed) {
            const dayBox = document.querySelector(`.day[data-day="${task.day}"]`);
            const div = document.createElement("div");
            div.className = "day-task";
            div.textContent = task.text;
            dayBox.appendChild(div);
        }
    });

    pendingCount.textContent = `Pendientes: ${tasks.filter(t => !t.completed).length}`;
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    render();
}

function deleteTask(index) {
    if (confirm("¿Eliminar esta tarea?")) {
        tasks.splice(index, 1);
        render();
    }
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;
        render();
    });
});
