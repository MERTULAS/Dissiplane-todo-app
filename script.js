var btn = document.getElementById("add-task");
var taskList = document.querySelector(".taskList");
var task = document.querySelector(".task");
var wellDoneFrame = document.querySelector(".done-tasks");
var whatIsThis = document.querySelector(".WhatIsThis");
var infoDiv = document.querySelector(".thisIsA");
var header = document.querySelector(".header");
var tasksLocalStorage = JSON.parse(localStorage.getItem("tasks"));
var doneTasks = JSON.parse(localStorage.getItem("doneTasks"));
var currentTasks = JSON.parse(localStorage.getItem("currentTasks"));
var taskLifeTime = JSON.parse(localStorage.getItem("taskLifeTime"));
var taskEndTime = JSON.parse(localStorage.getItem("taskEndTime"));
var arr = [1, 2, 3, 4 ,5, 6];
arr.push([1,2,3]);
// localStorage.clear();
if(!taskLifeTime) taskLifeTime = [];
if(!currentTasks) currentTasks = [];
if(!taskEndTime) taskEndTime = [];
function fullTime(t){
    return `${t.getUTCMinutes() + t.getUTCHours()*60 + (t.getUTCDate() - 1)*24*60} min.`;
}
if(tasksLocalStorage)
{
    tasksLocalStorage.forEach(element => {
            var div = document.createElement("div");
            div.className = "tasks";
            taskList.appendChild(div);
            var inDiv = document.createElement("div");
            inDiv.className = "inDiv";
            var checkBox = document.createElement("input")
            checkBox.setAttribute("type", "checkbox");
            checkBox.className = "checkbox";
            inDiv.appendChild(checkBox);
            var taskText = document.createElement("p");
            taskText.innerText = element;
            taskText.className = "taskText";
            inDiv.appendChild(taskText);
            if (currentTasks.indexOf(element) != -1)
            {
                inDiv.style.background = "rgb(127, 199, 127)";
            }
            else checkBox.disabled = true;
            div.appendChild(inDiv);
            var del = document.createElement("button");
            del.textContent = "X";
            del.className = "del";
            div.appendChild(del);
            
    });
}
else
{
    tasksLocalStorage = [];
}
if(doneTasks)
{
    doneTasks.forEach(element => {
        var div = document.createElement("div");
        div.className = "tasks";
        taskList.appendChild(div);
        var inDiv = document.createElement("div");
        inDiv.className = "inDiv";
        inDiv.style.width = "100%";
        var greenBox = document.createElement("div");
        greenBox.className = "greenBox";
        inDiv.insertBefore(greenBox, inDiv.firstChild);
        var taskText = document.createElement("p");
        taskText.innerText = element;
        taskText.className = "taskText";
        inDiv.appendChild(taskText);
        div.appendChild(inDiv);
        var taskTimeBox = document.createElement("div");
        taskTimeBox.style.background = "rgb(87, 151, 87)";
        taskTimeBox.className = "taskTimeBox";
        taskLifeTime.forEach(e1 =>{
            if(element == e1[0])
            {
                taskEndTime.forEach(e2 =>{
                    if(e2[0] == e1[0])
                    {
                        let date = new Date(e2[1] - e1[1]);
                        taskTimeBox.innerHTML = fullTime(date);
                    }
                });
            }
        });
        div.appendChild(taskTimeBox);
        wellDoneFrame.appendChild(div);
        wellDoneFrame.parentElement.style.display = "block";   
});
}
else
{
    doneTasks = [];
}

btn.addEventListener("click", function(){
    if(task.value && task.value.length < 44)
    {
        tasksLocalStorage.push(task.value);
        task.style.border = "none";
        var div = document.createElement("div");
        div.className = "tasks";
        taskList.appendChild(div);
        var inDiv = document.createElement("div");
        inDiv.className = "inDiv";
        var checkBox = document.createElement("input")
        checkBox.setAttribute("type", "checkbox");
        checkBox.className = "checkbox";
        checkBox.disabled = true;
        inDiv.appendChild(checkBox);
        var taskText = document.createElement("p");
        taskText.innerText = task.value;
        taskText.className = "taskText";
        task.value = "";
        inDiv.appendChild(taskText);
        div.appendChild(inDiv);
        var del = document.createElement("button");
        del.textContent = "X";
        del.className = "del";
        div.appendChild(del);
        task.setAttribute("placeholder", "Add New Task!");
        task.style.animation = "";
        localStorage.setItem("tasks", JSON.stringify(tasksLocalStorage));
    }
    else if(task.value.length > 43)
    {
        task.value = "";
        task.setAttribute("placeholder", "Max 43 Characters");
        task.style.border = "2px solid red";
        if(task.style.animation)task.style.animation = "";
        else task.style.animation = "alert 0.2s";
    }
    else
    {
        task.style.border = "2px solid red";
        task.setAttribute("placeholder", "Please Enter Task!");
        if(task.style.animation)task.style.animation = "";
        else task.style.animation = "alert 0.2s";
    }
})
taskList.addEventListener("click", function(e){
    var currentDate = Date.now();
    if(e.target.className == "del")
    {
        e.target.parentElement.remove();
        tasksLocalStorage.splice(tasksLocalStorage.indexOf(e.target.previousSibling.textContent), 1);
        localStorage.setItem("tasks", JSON.stringify(tasksLocalStorage));
    }
    if(e.target.className == "checkbox")
    {
        if(e.target.parentElement.style.background == "rgb(127, 199, 127)")
        {
            let parent1 = e.target.parentElement;
            if(parent1.style.background == "rgb(127, 199, 127)") parent1.style.background = "rgb(155, 137, 137)";
            parent1.nextSibling.remove();
            parent1.style.width = "100%";
            var greenBox = document.createElement("div");
            greenBox.className = "greenBox";
            parent1.insertBefore(greenBox, parent1.firstChild)
            var taskTimeBox = document.createElement("div");
            taskTimeBox.style.background = "rgb(87, 151, 87)";
            taskTimeBox.className = "taskTimeBox";
            parent1.parentElement.appendChild(taskTimeBox);
            wellDoneFrame.appendChild(parent1.parentElement);
            wellDoneFrame.parentElement.style.display = "block";
            e.target.disabled = true;
            doneTasks.push(e.target.nextSibling.textContent);
            tasksLocalStorage.splice(tasksLocalStorage.indexOf(e.target.nextSibling.textContent),1);
            localStorage.setItem("tasks", JSON.stringify(tasksLocalStorage));
            localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
            taskEndTime.push([e.target.nextSibling.textContent, currentDate])
            e.target.remove();
            localStorage.setItem("taskEndTime", JSON.stringify(taskEndTime));
            doneTasks.forEach(element => {
                taskLifeTime.forEach(e1 =>{
                    if(element == e1[0])
                    {
                        taskEndTime.forEach(e2 =>{
                            if(e2[0] == e1[0])
                            {
                                let date = new Date(e2[1] - e1[1]);
                                taskTimeBox.innerHTML = fullTime(date);
                            }
                        });
                    }
                });
            });
        }
    }
    if(e.target.className == "inDiv")
    {
        if(e.target.style.background == "rgb(127, 199, 127)") 
        {
            e.target.style.background = " rgb(155, 137, 137)";
            currentTasks.splice(currentTasks.indexOf(e.target.textContent), 1);
            localStorage.setItem("currentTasks", JSON.stringify(currentTasks));
            e.target.firstChild.disabled = true;
        }
        else 
        {
            e.target.style.background = "rgb(127, 199, 127)";
            currentTasks.push(e.target.textContent);
            localStorage.setItem("currentTasks", JSON.stringify(currentTasks));
            taskLifeTime.push([e.target.textContent, currentDate]);
            localStorage.setItem("taskLifeTime", JSON.stringify(taskLifeTime));
            e.target.firstChild.disabled = false;
        } 
    }
});
whatIsThis.addEventListener("mouseenter", function(){
    infoDiv.style.display = "flex";
    infoDiv.style.animation = "visibleInfo 0.4s ease-out";
})
whatIsThis.addEventListener("mouseleave", function(){
    infoDiv.style.display = "none";
});
if(window.innerWidth < 700){
    whatIsThis.addEventListener("click", ()=>{
        if(infoDiv.style.display == "none") infoDiv.style.display = "flex";
        else infoDiv.style.display = "none";
    })
}
window.addEventListener("load", ()=>{  const load = document.querySelector(".loader-wrapper");
load.style.display = "none";
const main = document.querySelector(".main");
main.style.display = "block";
});

