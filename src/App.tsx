import React, {useState} from 'react'
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'All' | 'Active' | 'Completed'

export type TodoListsTitleType = {
    id: string,
    title: string,
    filter: FilterType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    // const todoListTitle_1 = "What to learn"
    let todoLists1 = v1()
    let todoLists2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListsTitleType>>([
        {id: todoLists1, title: "What to learn", filter: "All"},
        {id: todoLists2, title: "What to buy", filter: "All"}
    ])

    let initialTasks: TasksStateType = {
        [todoLists1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Python", isDone: false},
            {id: v1(), title: "С#", isDone: false}
        ],
        [todoLists2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Oil", isDone: false},
            {id: v1(), title: "Butter", isDone: true},
            {id: v1(), title: "Meat", isDone: true}
        ]
    }
    // type TodoType = typeof initialTasks
    // type TodoListsType = ReturnType<TodoType>

    const [tasks, setTask] = useState<TasksStateType>(initialTasks)

    const removeTask = (todoListId: string, id: string) => {
        let taskAfterRemove = tasks[todoListId].filter(el => el.id !== id)
        setTask({...tasks, [todoListId]: taskAfterRemove})
    }
    const addTodoList = (title: string) => {
        let newTodoList = v1()
        setTodoLists([{id: newTodoList, title, filter: "All"}, ...todoLists])
        setTask({[newTodoList]: [], ...tasks,})
    }
    const addTask = (todoListId: string, title: string) => {
        if (title.trim()) {
            let newTask = [{id: v1(), title: title, isDone: false}, ...tasks[todoListId]]
            setTask({...tasks, [todoListId]: newTask})
        }
    }
    const updateTask = (todoListId: string, id: string, title: string) => {
        let task = tasks[todoListId].map(m => m.id === id ? {...m, title} : m)
        setTask({...tasks, [todoListId]: task})
    }
    const updateTodoList = (todoListId: string, title: string) =>{
        setTodoLists(todoLists.map(m => m.id === todoListId ? {...m, title} : m))
    }

    const addFilter = (todoListId: string, value: FilterType) => {
        setTodoLists(todoLists.map(m => m.id === todoListId ? {...m, filter: value} : m))
    }
    const changeStatus = (todoListId: string, id: string, status: boolean) => {
        let task = tasks[todoListId].map(m => m.id === id ? {...m, isDone: status} : m)
        setTask({...tasks, [todoListId]: task})
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(f => f.id !== todoListId))
        delete tasks[todoListId]
    }
    return (
        <div className="App">
            <AddItemForm addTask={addTodoList}/>
            {todoLists.map(m => {
                let newTask = tasks[m.id]
                if (m.filter === "Active") {
                    newTask = tasks[m.id].filter(t_el => !t_el.isDone)
                }
                if (m.filter === "Completed") {
                    newTask = tasks[m.id].filter(t_el => t_el.isDone)
                }
                return (
                    <TodoList
                        key={m.id}
                        todoListId={m.id}
                        title={m.title}
                        tasks={newTask}
                        removeTask={removeTask}
                        addFilter={addFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={m.filter}
                        removeTodoList={removeTodoList}
                        updateTask={updateTask}
                        updateTodoList={updateTodoList}
                    />
                )
            })}
        </div>
    )
}

export default App;
