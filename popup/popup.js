let tasks = []

const startTimerBtn = document.getElementById("start-timer-btn")
startTimerBtn.addEventListener("click", () => {
    chrome.storage.local.get(["isRunning"], (res) => {
        chrome.storage.local.set({
        isRunning: !res.isRunning,
        }, () => {
            startTimerBtn.textContent = !res.isRunning ? "Pause Timer" : "Start Timer"
        })
    })    
})


const resetTimerBtn = document.getElementById("reset-timer-btn")
resetTimerBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        isRunning: false,
        timer: 0
    }, () => {
        startTimerBtn.textContent = "Start Timer"
    })
})


function updateTime() {
    chrome.storage.local.get(["timer"], (res) => {
         const timerValue = document.getElementById("timer")
         const minutes = `${25 - Math.ceil(res.timer / 60)}`.padStart(2, "0")
         let seconds = "00"
         if (res.timer % 60 != 0) {
            seconds = `${60 - res.timer % 60}`.padStart(2, "0")
         }
        timerValue.textContent = `${minutes}:${seconds}`
    })
}
updateTime()
setInterval(updateTime, 1000)

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