let tasks = []

const addTasks = document.getElementById("add-task-btn")
addTasks.addEventListener("click", ()=> addTask())

chrome.storage.sync.get(["tasks"], (res) => {
    tasks = res.tasks ? res.tasks : []
    renderTasks()
})

function saveTasks() {
    chrome.storage.sync.set({
        tasks,
    })
}

function renderTask(tasksLength) {
    const taskRow=document.createElement("div")

    const text = document.createElement("input")
    text.type="text"
    text.placeholder="Enter a task..."
    text.value=tasks[tasksLength]
    text.addEventListener("change", () => {
        tasks[tasksLength] = text.value
        saveTasks()
    })

    const deleteBtn = document.createElement("input")
    deleteBtn.type="button"
    deleteBtn.value="X"
    deleteBtn.addEventListener("click", () => {
        deleteTask(tasksLength)
    })

    taskRow.appendChild(text)
    taskRow.appendChild(deleteBtn)

    const taskContainer = document.getElementById("task-container")
    taskContainer.appendChild(taskRow)
}


function addTask () {
    const tasksLength = tasks.length
    tasks.push("")
    renderTask(tasksLength)
    saveTasks()
}

function deleteTask(tasksLength) {
    tasks.splice(tasksLength, 1)
    renderTasks()
    saveTasks()
}

function renderTasks() {
    const taskContainer = document.getElementById("task-container")
    taskContainer.textContent = ""
    tasks.forEach((taskTest, taskNum) => {
        renderTask(taskNum)
    })
}