import React, {useState} from 'react'
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'All' | 'Active' | 'Completed'

function App() {
    const todoListTitle_1 = "What to learn"

    let initialTask: Array<TaskType> = [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Python", isDone: false},
        {id: v1(), title: "С#", isDone: false}
    ]

    const [tasks, setTask] = useState(initialTask)

    const removeTask = (id: string) => {
        setTask(tasks.filter(t_el => t_el.id !== id))
    }
    const addTask = (title: string) => {
        if (title.trim()){
            setTask([{id: v1(), title, isDone: false}, ...tasks])
        }
    }
    const [filter, setFilter] = useState<FilterType>('All')

    const addFilter = (value: FilterType) => {
        setFilter(value)
    }
    const changeStatus = (id: string, status: boolean) => {
        let task = tasks.map(m => {
            return m.id === id ? {...m, isDone: status} : m
        })
        setTask(task)
    }

    let newTask = tasks
    if (filter === "Active") {
        newTask = tasks.filter(t_el => !t_el.isDone)
    }
    if (filter === "Completed") {
        newTask = tasks.filter(t_el => t_el.isDone)
    }

    return (<div className="App">
            <TodoList title={todoListTitle_1}
                      tasks={newTask}
                      removeTask={removeTask}
                      addFilter={addFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={filter}
            />
        </div>
    )
}

export default App;
