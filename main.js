//유저가 값을 입력한다
// +버튼을 클릭하면 할일이 추가된다
// 삭제 버튼을 누르면 할일이 삭제된다
// 완료 버튼을 누르면 할일이 끝나면서 밑줄이 간다
// not done done 탭을 누르면, 언더바가 이동한다
// done탭은 끝난아이템만, not done탭은 진행중인 아이템만
// 전체탭을 누르면 전체아이템으로 돌아옴


let userInput = document.getElementById("user-input");
let addButton = document.getElementById("add-Button");
let taskList = []

addButton.addEventListener("click", addTask)

 
function addTask(){
    let taskContent = userInput.value
    taskList.push(taskContent);
    console.log(taskList)
    render()
}

function render() {
    let resultHTML = "";
    for (let i = 0; i < taskList.length; i++){
        resultHTML += `<div class="task-tap-user">
        <div>${taskList[i]}</div>
        <div>
        <button>완료</button>
        <button>삭제</button>
        </div>
    </div>`
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}