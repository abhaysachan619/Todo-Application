const todo = new Todo()
const todoInput = document.querySelector('#getTodoInput')
const todoListContainer = document.querySelector('#todoListContainer')

const emptyNode = (parent) =>{
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}
const renderList = ()=>{
    emptyNode(todoListContainer)
  todo.getTodos().map((todo) =>{
    const LI = document.createElement('li')
    const DIV = document.createElement('div')
    const INPUT = document.createElement('input')
    const SPAN = document.createElement('span')

    DIV.classList.add('inputBox')
    INPUT.type =  'text'
    INPUT.value = todo.value
    SPAN.classList.add('crossIcon')
    SPAN.innerText = 'X'
    SPAN.setAttribute('id', todo.id)

    DIV.appendChild(INPUT)
    DIV.appendChild(SPAN)
    LI.appendChild(DIV)
    todoListContainer.appendChild(LI)
  })
}
function addTodo(){
    const inputValue = todoInput.value
    if(inputValue === '') {
        alert("Enter valid todo")
        return 
    }
    todo.addTodo(inputValue)  
    renderList()  
}