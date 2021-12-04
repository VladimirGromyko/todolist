import React from 'react'
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}


function App() {
    const todoListTitle_1 = "What to learn"
    const todoListTitle_2 = "What to buy"

    const task_1: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ]
    const task_2: Array<TaskType> = [
        {id: 4, title: "Meat", isDone: true},
        {id: 5, title: "Beer", isDone: false},
        {id: 6, title: "Milk", isDone: false}
    ]

    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={task_1}/>
            <TodoList title={todoListTitle_2} tasks={task_2}/>
        </div>
    )
}

export default App;
