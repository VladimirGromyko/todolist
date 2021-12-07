import React, {ChangeEvent, useState} from 'react'
import {FilterType, TaskType} from "./App";
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import s from "./TodoList.module.css"


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addFilter: (value: FilterType) => void
    addTask: (title: string) => void
    changeStatus: (id: string, status: boolean) => void
    filter: FilterType
}
export const TodoList = ({
                             title, tasks, removeTask, addFilter, addTask,
                             changeStatus, filter, ...props
                         }: TodoListPropsType) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | boolean>('Title is required')

    const addTaskHandler = () => {
        let trimNewTitle = newTitle.trim()
        if (trimNewTitle && trimNewTitle.length < 15) {
            addTask(trimNewTitle)
            setNewTitle('')
            setError(false)
        } else if (trimNewTitle.length > 15) {
        } else {
            setError('Title is required')
            setNewTitle('')
        }
    }
    const addFilterTaskHandler = (value: FilterType) => {
        addFilter(value)
    }
    const removeTaskHandler = (tId: string) => {
        removeTask(tId)
    }
    const onChangeCheckboxHandler = (elId: string, e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(elId, e.currentTarget.checked)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <Input newTitle={newTitle} setNewTitle={setNewTitle} addTask={addTask} setError={setError}
                       error={error}/>
                {/*<Button name={'+'} callBack={addTaskHandler}/>*/}
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={s.errorMessage}>{error}</div>}
            </div>
            <ul>
                {tasks.map(el => {
                    return (
                        <li key={el.id}>
                            <input type="checkbox"
                                   checked={el.isDone}
                                   onChange={(e) => onChangeCheckboxHandler(el.id, e)}
                            />
                            <span className={el.isDone ? s.isDone : ''}>
                                {el.title}
                            </span>
                            <button onClick={() => removeTaskHandler(el.id)}>X</button>
                            {/*  <Button name='X' callBack={() => removeTaskHandler(el.id)}/>*/}
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button name={'All'} filter={filter} callBack={() => addFilterTaskHandler('All')}/>
                <Button name={'Active'} filter={filter} callBack={() => addFilterTaskHandler('Active')}/>
                <Button name={'Completed'} filter={filter} callBack={() => addFilterTaskHandler('Completed')}/>
            </div>
        </div>
    )
}