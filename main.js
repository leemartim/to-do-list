//유저가 값을 입력한다
// +버튼을 클릭하면 할일이 추가된다
// 삭제 버튼을 누르면 할일이 삭제된다
// 완료 버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 1. check 버튼을 클릭하면 true false 전환
// 2. true 일때 끝난것으로 변화하면서 밑줄
// 3. false 일때 밑줄 해제

// not done done 탭을 누르면, 언더바가 이동한다
// done탭은 끝난아이템만, not done탭은 진행중인 아이템만
// 전체탭을 누르면 전체아이템으로 돌아옴


let userInput = document.getElementById("user-input");
let addButton = document.getElementById("add-Button");
let tabs = document.querySelectorAll(".task-tap div");
let taskList = []
let mode = 'all'
let filterList = []
let horizontalBar = document.getElementById("under-line")
let horizontalMenu = document.querySelectorAll(".task-tap div")
let list = []

addButton.addEventListener("click", function(){
    addTask()
    userInput.value = "";
})

document.querySelector('#user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addTask()
      userInput.value = "";
    }
});

userInput.addEventListener("focus", function(){
    userInput.value = "";
})

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)})
};

horizontalMenu.forEach((menu) =>
    menu.addEventListener("click", (e) => horizontalIndicator(e.currentTarget)));

function horizontalIndicator(e) {
    horizontalBar.style.left = e.offsetLeft + -10 +"px";
    horizontalBar.style.width = e.offsetWidth + 3 + "px";
    horizontalBar.style.top = e.offsetTop + e.offsetHeight + 6 + "px";
};
 
function addTask(){
    let task = {
        id : randomIDGenerate(),
        taskContent : userInput.value,
        isComplete : false
    };
    taskList.push(task);
    console.log(taskList);
    render()
}

function render() {
    list = [];
    if(mode == "all") {
        list = taskList;
    }else if(mode == "ongoing" || mode == "done"){
        list = filterList;
    }
    let resultHTML = "";
    for (let i = 0; i < list.length; i++){
        if(list[i].isComplete == true) {
            resultHTML += 
            `<div class="task-tap-user">
            <div class="task-done">${list[i].taskContent}</div> 
            <div>
            <button onclick="toggleComplete('${list[i].id}')">완료</button>
            <button onclick="taskComplete('${list[i].id}')">삭제</button>
            </div>
            </div>`    
        }else {
            resultHTML += 
            `<div class="task-tap-user">
            <div>${list[i].taskContent}</div> 
            <div>
            <button onclick="toggleComplete('${list[i].id}')">완료</button>
            <button onclick="taskComplete('${list[i].id}')">삭제</button>
            </div>
            </div>`
        }

    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i =0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

function taskComplete(id){
    for(let i =0; i < taskList.length; i++){
        
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    render();
}

function filter(event){
    mode = event.target.id;
    filterList = []
    if (mode == "all"){
        render();
    } else if(mode == "ongoing"){
        for (let i = 0; i < taskList.length; i++){
            if (taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }
        render();
    } else if(mode =="done"){
        for (let i = 0; i<taskList.length;i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }
        render();
    }
    console.log(filterList);
}

