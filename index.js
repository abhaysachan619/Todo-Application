const todo = new Todo()
const todoInput = document.querySelector('#getTodoInput')
const todoListContainer = document.querySelector('#todoListContainer')
const key = "todoStorage"

const updateLocalStorage = ()=>{
   localStorage.setItem(key, JSON.stringify(todo.getTodos()))
}
const emptyNode = (parent) =>{
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}

const emptyTodoInput = () => {
  todoInput.value = ''
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
    INPUT.setAttribute('disabled','')
    INPUT.setAttribute('id',`input${todo.id}`)
    INPUT.setAttribute('onKeyUp', 'onInputEdit(event)')
    SPAN.classList.add('crossIcon')
    SPAN.innerText = 'X'
    SPAN.setAttribute('id',todo.id)

    DIV.appendChild(INPUT)
    DIV.appendChild(SPAN)
    LI.appendChild(DIV)
    todoListContainer.appendChild(LI)
  })
  updateLocalStorage()
}


//editable
function onInputEdit(e){
   if(e.key !== 'Enter') return
   const id = (e.target.id).slice(5)
   if(!id) return
   const value = e.target.value
   todo.updateTodo(id, value)
   renderList()

}

function makeInputEditable(e){
   const id = e.target.id
   if(!id) return
   const inputBox = document.querySelector('#'+id)
   inputBox.removeAttribute('disabled')
}

function addTodo(){
    const inputValue = todoInput.value
    if(inputValue === '') {
        alert("Enter valid todo")
        return 
    }
    todo.addTodo(inputValue) 
    emptyTodoInput() 
    renderList()  
}

function handleClick(e){
    if(e && e.target && e.target.id && e.target.nodeName === 'SPAN'){
        todo.deleteTodo(e.target.id)
        renderList()
    }
}

(()=>{
    const localTodos = localStorage.getItem(key)
    if(localTodos){
        todo.setTodos(JSON.parse(localTodos))
        renderList()
    }
})()