import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {FilterType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addFilter: (value: FilterType) => void
    addTask: (title: string) => void

}
export const TodoList: React.FC<TodoListPropsType> = ({
                                                          title, tasks,
                                                          removeTask, addFilter,
                                                          addTask,
                                                      }) => {

    const [newTitle, setNewTitle] = useState('')
    const addTaskHandler = () => {
        addTask(newTitle)
        setNewTitle('')
    }
    const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const addFilterTaskHandler = (value: FilterType) => {
        addFilter(value)
    }
    const removeTaskHandler = (tId: string) => {
        removeTask(tId)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input onChange={onChangeTaskHandler}
                       onKeyPress={onKeyPressTaskHandler}
                       value={newTitle}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {/*   {tasks.map(el => {*/}
                {tasks.map(el => {

                    return (
                        <li key={el.id}>
                            <input type="checkbox"
                                   checked={el.isDone}/>
                            <span>
                                {el.title}
                            </span>
                            <button onClick={() => removeTaskHandler(el.id)}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => addFilterTaskHandler('All')}>All</button>
                <button onClick={() => addFilterTaskHandler('Active')}>Active</button>
                <button onClick={() => addFilterTaskHandler('Completed')}>Completed</button>
            </div>
        </div>
    )
}