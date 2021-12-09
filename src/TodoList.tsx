import React, {ChangeEvent, useState} from 'react'
import {FilterType, TaskType} from "./App";
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import s from "./TodoList.module.css"


type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, id: string) => void
    addFilter: (todoListId: string, value: FilterType) => void
    addTask: (todoListId: string, title: string) => void
    changeStatus: (todoListId: string, id: string, status: boolean) => void
    filter: FilterType
    removeTodoList: (todoListId: string) => void
}
export const TodoList = ({
                             todoListId, title, tasks, removeTask, addFilter,
                             addTask, changeStatus, filter, removeTodoList, ...props
                         }: TodoListPropsType) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | boolean>('Title is required')

    const addTaskHandler = () => {
        let trimNewTitle = newTitle.trim()
        if (trimNewTitle && trimNewTitle.length < 15) {
            addTask(todoListId, trimNewTitle)
            setNewTitle('')
            setError('Title is required')
        } else if (trimNewTitle.length > 15) {
        } else {
            setError('Title is required')
            setNewTitle('')
        }
    }
    const addFilterTaskHandler = (todoListId: string, value: FilterType) => {
        addFilter(todoListId, value)
    }
    const removeTaskHandler = (todoListId: string, tId: string) => {
        removeTask(todoListId, tId)
    }
    const onChangeCheckboxHandler = (elId: string, e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(todoListId, elId, e.currentTarget.checked)
    }
    const removeTodoListHandler = (todoListId: string) => {
        removeTodoList(todoListId)
    }

    return (
        <div>
            <h3>{title}
                <button onClick={() => removeTodoListHandler(todoListId)}>X</button>
            </h3>
            <div>
                <Input
                    todoListId={todoListId}
                    newTitle={newTitle}
                    setNewTitle={setNewTitle}
                    addTask={addTask}
                    setError={setError}
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
                            <button onClick={() => removeTaskHandler(todoListId, el.id)}>X</button>
                            {/*  <Button name='X' callBack={() => removeTaskHandler(el.id)}/>*/}
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button name={'All'} filter={filter} callBack={() => addFilterTaskHandler(todoListId, 'All')}/>
                <Button name={'Active'} filter={filter} callBack={() => addFilterTaskHandler(todoListId, 'Active')}/>
                <Button name={'Completed'} filter={filter}
                        callBack={() => addFilterTaskHandler(todoListId, 'Completed')}/>
            </div>
        </div>
    )
}