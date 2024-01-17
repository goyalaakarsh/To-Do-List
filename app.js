let addBtn = document.querySelector("button");
let inpt = document.querySelector("input");
let taskList = document.querySelector("ul");

function addTask() {
    if (inpt.value) {
        let task = document.createElement("li");
        task.innerText = inpt.value;

        // Insert the new task at the beginning of the list
        taskList.insertBefore(task, taskList.firstChild);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        task.appendChild(span);
        inpt.value = "";
        updateTaskOrder();
        saveData();
    }
}

addBtn.addEventListener("click", function () {
    addTask();
});

taskList.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        updateTaskOrder();
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        updateTaskOrder();
        saveData();
    }
});

function updateTaskOrder() {
    let pendingTasks = [];
    let completedTasks = [];

    // Separate pending and completed tasks
    taskList.childNodes.forEach(task => {
        if (!task.classList || !task.classList.contains("checked")) {
            pendingTasks.push(task);
        } else {
            completedTasks.push(task);
        }
    });

    // Reorder tasks by placing completed tasks at the end
    taskList.innerHTML = "";
    pendingTasks.forEach(task => taskList.appendChild(task));
    completedTasks.forEach(task => taskList.appendChild(task));
}

function saveData() {
    localStorage.setItem("data", taskList.innerHTML);
}

function showTask() {
    taskList.innerHTML = localStorage.getItem("data");
}

showTask();

document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});