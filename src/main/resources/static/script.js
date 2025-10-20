import {option} from "./option.js";

// ✅ Selectors (all IDs/classes in sync with your HTML)
const addTaskPopUp = document.querySelector("#addPopup");
const editTaskPopUp = document.querySelector("#editPopup");
const addTaskForm = document.querySelector("#addTaskForm");
const editTaskForm = document.querySelector("#editTaskForm");
const taskList = document.querySelector("#taskList");
const openAddPopupBtn = document.querySelector("#openAddPopup");
const closeAddPopupBtn = document.querySelector("#closeAddPopup");
const closeEditPopupBtn = document.querySelector("#closeEditPopup");

// ✅ Load tasks on page start
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

// ✅ FAB opens Add Task popup
openAddPopupBtn.addEventListener("click", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.querySelector("#dueDate").min = tomorrow.toISOString().split("T")[0];
    addTaskPopUp.style.display = "flex";
});

// ✅ Cancel buttons close popups
closeAddPopupBtn.addEventListener("click", () => {
    addTaskPopUp.style.display = "none";
});
closeEditPopupBtn.addEventListener("click", () => {
    editTaskPopUp.style.display = "none";
});

// ✅ Add Task form submit
addTaskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const taskName = document.querySelector("#taskTitle").value.trim();
    const dueDate = document.querySelector("#dueDate").value;

    const newTask = {
        task: taskName, dueDate: dueDate, done: false, dateCreated: new Date().toISOString().split("T")[0],
    };

    await addTask(newTask)
        .then(() => {
                addTaskForm.reset();
                addTaskPopUp.style.display = "none";
                loadTasks();
            }
        )
});

// ✅ Edit Task form submit
editTaskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const taskName = document.querySelector("#editTaskTitle").value.trim();
    const dueDate = document.querySelector("#editDueDate").value;
    const taskId = Number(document.querySelector("#taskId").value);

    const updatedTask = {
        task: taskName,
        dueDate: dueDate
    };

    await updateTask(updatedTask, taskId)
        .then(() => {
            editTaskPopUp.style.display = "none";
            loadTasks();
        })
});

// ✅ API FUNCTIONS
const addTask = async (task) => {
    const res = await fetch("http://localhost:8080/tasks", option.post(task));
    console.log("Add task status:", res.status);
};

const updateTask = async (task, id) => {
    const res = await fetch(`http://localhost:8080/tasks/${id}`, option.put(task));
    console.log("Update task status:", res.status);
};

const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:8080/tasks/${id}`, option.delete(id));
    console.log("Delete task status:", res.status);
};

// ✅ Load and render tasks
const loadTasks = async () => {
    const res = await fetch("http://localhost:8080/tasks", option.get());

    // 🛡️ Check if there’s no content
    if (res.status === 204) {
        populateTask([]);
        return;
    }

    const text = await res.text();  // get raw text
    const tasks = text ? JSON.parse(text) : [];  // if empty, use []

    populateTask(tasks);
};


const populateTask = (tasks) => {
    taskList.innerHTML = "";

    if (!tasks || tasks.length === 0) {
        taskList.innerHTML = "<p>No tasks found. Add one!</p>";

        return;
    }

    tasks.forEach((task) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.innerHTML = `
            <div class="task-header">
                <span class="task-id">#${task.id}</span>
                <span class="task-name ${task.done ? "done" : ""}">${task.task}</span>
                <div class="buttons">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            </div>
            <p class="created-date">Created: ${task.dateCreated}</p>
            <div class="task-details">
                <p>Due: <span class="due-date">${task.dueDate}</span></p>
                <div class="checkbox-container">
                    <input type="checkbox" class="done-checkbox" ${task.done ? "checked" : ""}>
                    <label>Done</label>
                </div>
            </div>
        `;
        taskList.appendChild(taskDiv);
    });
};

// ✅ Handle delete/edit/done
taskList.addEventListener("click", async (e) => {
    const taskDiv = e.target.closest(".task");
    if (!taskDiv) return;

    const taskId = taskDiv.querySelector(".task-id").textContent.replace("#", "");

    if (e.target.classList.contains("delete-btn")) {
        await deleteTask(taskId);
        await loadTasks();
    }

    if (e.target.classList.contains("edit-btn")) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.querySelector("#editDueDate").min = tomorrow.toISOString().split("T")[0];
        editTaskPopUp.style.display = "flex";
        editTaskPopUp.querySelector("#taskId").value = taskId;
        editTaskPopUp.querySelector("#editTaskTitle").value = taskDiv.querySelector(".task-name").textContent;
        editTaskPopUp.querySelector("#editDueDate").value = taskDiv.querySelector(".due-date").textContent;
    }
});

// ✅ Toggle done checkbox
taskList.addEventListener("change", (e) => {
    if (e.target.classList.contains("done-checkbox")) {
        const taskDiv = e.target.closest(".task");
        const taskName = taskDiv.querySelector(".task-name");
        taskName.classList.toggle("done", e.target.checked);
    }
});
