import React, {useState} from 'react'
import './App.css';
import {TodoList} from "./TodoList";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type filterType = 'All' | 'Active' | 'Completed'

function App() {
    const todoListTitle_1 = "What to learn"

    let initialTask: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ]

    const [task, setTask] = useState(initialTask)
    const [filter, setFilter] = useState<filterType>('All')
    // const [newTask, setNewTask] = useState(initialTask)
    // const task_2: Array<TaskType> = [
    //     {id: 4, title: "Meat", isDone: true},
    //     {id: 5, title: "Beer", isDone: false},
    //     {id: 6, title: "Milk", isDone: false}
    // ]
    const removeTask = (id: number) => {
        setTask(task.filter(t_el => t_el.id !== id))
        // setNewTask(newTask.filter(t_el => t_el.id !==id))
    }
    const addFilter = (value: filterType) => {
        setFilter(value)
    }
    let newTask = task

    if (filter === "Active") {
        newTask = task.filter(t_el => !t_el.isDone)
    }
    if (filter === "Completed") {
        newTask = task.filter(t_el => t_el.isDone)
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
            />
        </div>
    )
}

export default App;
