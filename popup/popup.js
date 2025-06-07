const addTasks = document.getElementById("add-task-btn")
addTasks.addEventListener("click", ()=> addTask())

function addTask () {
    const taskRow=document.createElement("div")
    const text = document.createElement("input")
    text.type="text"
    text.placeholder="Enter a task..."

    const deleteBtn = document.createElement("input")
    deleteBtn.type="button"
    deleteBtn.value="X"

    taskRow.appendChild(text)
    taskRow.appendChild(deleteBtn)

    const taskContainer = document.getElementById("task-container")
    taskContainer.appendChild(taskRow)
}


function removeTask() {
    
}