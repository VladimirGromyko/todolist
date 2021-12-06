import React, {useState} from 'react'
import {FilterType, TaskType} from "./App";
import {Button} from "./components/Button";
import {Input} from "./components/Input";

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
                <Input newTitle={newTitle} setNewTitle={setNewTitle} addTask={addTask}/>
                <Button name={'+'} callBack={addTaskHandler}/>
            </div>
            <ul>
                {tasks.map(el => {

                    return (
                        <li key={el.id}>
                            <input type="checkbox"
                                   checked={el.isDone}/>
                            <span>
                                {el.title}
                            </span>
                            <Button name='X' callBack={() => removeTaskHandler(el.id)}/>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button name={'All'} callBack={() => addFilterTaskHandler('All')}/>
                <Button name={'Active'} callBack={() => addFilterTaskHandler('Active')}/>
                <Button name={'Completed'} callBack={() => addFilterTaskHandler('Completed')}/>
            </div>
        </div>
    )
}