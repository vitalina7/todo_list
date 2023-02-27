const form = document.querySelector("#form");
const inputEl = document.querySelector(".form-control");
const ul = document.querySelector(".list-group");
const emptyList = document.querySelector(".empty-list__title");

let tasks = [];
if (localStorage.getItem('tasks')) {
    tasks=JSON.parse(localStorage.getItem('tasks'))
}

checkEmptyLIst();
//Add tasks
form.addEventListener('submit', onFormSubmit);
function onFormSubmit(event) {
event.preventDefault();
    const taskText = inputEl.value;
    const newTask = {
        id: Date.now(),
        text: taskText,
        done:false,
    }
    tasks.push(newTask);
    const cssClass=newTask.done ?  'task-title task-title--done' : 'task-title'
    console.log(tasks);
tasks.forEach((task) => {
     const html=`<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${newTask.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`
    ul.insertAdjacentHTML("beforeend", html);
})
    inputEl.value = "";
    inputEl.focus();
    checkEmptyLIst();
    saveToLocalStorage();
    
}
//Remove Tasks
ul.addEventListener('click', deleteTask);
function deleteTask(event) {
    if (event.target.dataset.action !== 'delete') {
        return;
    }
    else {
        const parentNode = event.target.closest('li');
        const id = Number(parentNode.id);
        const index = tasks.findIndex((task) => task.id === id);
        tasks.splice(index, 1);
        parentNode.remove();
        checkEmptyLIst();
        saveToLocalStorage();
    }
}
  

//Change Tasks
ul.addEventListener('click', doneTask);
function doneTask(event) {
    if (event.target.dataset.action !== 'done') {
        return;
    }else{
        const parentNode = event.target.closest('li');
        parentNode.classList.toggle('task-title--done');
        const id = Number(parentNode.id);
        const task = tasks.find((task) => task.id === id);
        task.done = !task.done;
        saveToLocalStorage();
        
   }
}

function checkEmptyLIst() {
    if (tasks.length === 0) {
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список пустий</div>
				</li>`;
        ul.insertAdjacentHTML('afterbegin', emptyListHTML);
    } else {
        const emtyListEl = document.querySelector('#emptyList');
        emtyListEl ? emtyListEl.remove() : null;
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}






