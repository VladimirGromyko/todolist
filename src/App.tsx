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

    // const [newTask, setNewTask] = useState(initialTask)
    // const task_2: Array<TaskType> = [
    //     {id: 4, title: "Meat", isDone: true},
    //     {id: 5, title: "Beer", isDone: false},
    //     {id: 6, title: "Milk", isDone: false}
    // ]
    const removeTask = (id: string) => {
        setTask(tasks.filter(t_el => t_el.id !== id))
        // setNewTask(newTask.filter(t_el => t_el.id !==id))
    }
    const addTask = (title: string) => {
        setTask([{id: v1(), title, isDone: false},...tasks])
    }
    const [filter, setFilter] = useState<FilterType>('All')
    const addFilter = (value: FilterType) => {
        setFilter(value)
    }
    let newTask = tasks

    if (filter === "Active") {
        newTask = tasks.filter(t_el => !t_el.isDone)
    }
    if (filter === "Completed") {
        newTask = tasks.filter(t_el => t_el.isDone)
    }

    // switch (filter) {
    //     case "Active" :
    //         newTask = task.filter(t_el => !t_el.isDone)
    //         break
    //     case "Completed" :
    //         newTask = task.filter(t_el => t_el.isDone)
    //         break
    //     default:
    //         break
    // }

    return (<div className="App">
            <TodoList title={todoListTitle_1}
                      tasks={newTask}
                      removeTask={removeTask}
                      addFilter={addFilter}
                      addTask = {addTask}
            />
        </div>
    )
}

export default App;
