import React, {ChangeEvent} from 'react'
import {FilterType, TaskType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {blue} from "@mui/material/colors";


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
    updateTask: (todoListId: string, id: string, title: string) => void
    updateTodoList: (todoListId: string, title: string) => void
}
export const TodoList = ({
                             todoListId, title, tasks, removeTask, addFilter,
                             addTask, changeStatus, filter, removeTodoList,
                             updateTask, updateTodoList, ...props
                         }: TodoListPropsType) => {

    // const addFilterTaskHandler = (todoListId: string, value: FilterType) => {
    //     addFilter(todoListId, value)
    // }
    const addFilterAllTaskHandler = () => {addFilter(todoListId, 'All')}
    const addFilterActiveTaskHandler = () => {addFilter(todoListId, 'Active')}
    const addFilterCompletedTaskHandler = () => {addFilter(todoListId, 'Completed')}

    const removeTaskHandler = (tId: string) => {
        removeTask(todoListId, tId)
    }
    const onChangeCheckboxHandler = (elId: string, e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(todoListId, elId, e.currentTarget.checked)
    }
    const removeTodoListHandler = () => {
        removeTodoList(todoListId)
    }
    const addTaskHandler = (title: string) => {
        addTask(todoListId, title)
    }
    const updateTaskHandler = (id: string, taskTitle: string) => {
        updateTask(todoListId, id, taskTitle)
    }
    const updateTodoListHandler = (TodoListTitle: string) => {
        updateTodoList(todoListId, TodoListTitle)
    }
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <div>
            <h3>
                <EditableSpan isDone={false}
                              title={title}
                              callBackName={(title) => updateTodoListHandler(title)}/>
                <IconButton aria-label="delete">
                    <Delete onClick={removeTodoListHandler}/>
                </IconButton>
                {/*<button onClick={() => removeTodoListHandler(todoListId)}>X</button>*/}
            </h3>
            <AddItemForm addTask={addTaskHandler}/>
            <div>
                {tasks.map(el => {
                    return (
                        <div key={el.id}>
                            <Checkbox
                                {...label}
                                // defaultChecked
                                checked={el.isDone}
                                onChange={(e) => onChangeCheckboxHandler(el.id, e)}

                                sx={{
                                    color: blue[800],
                                    '&.Mui-checked': {
                                        color: blue[600],
                                    },
                                }}
                            />

      {/*                      <input type="checkbox"
                                   checked={el.isDone}
                                   onChange={(e) => onChangeCheckboxHandler(el.id, e)}
                            />*/}
                            <EditableSpan
                                isDone={el.isDone}
                                title={el.title}
                                callBackName={(title) => updateTaskHandler(el.id, title)}
                            />
                            <IconButton aria-label="delete" size="small">
                                <Delete fontSize="small" onClick={() => removeTaskHandler(el.id)}/>
                            </IconButton>
                            {/*<button onClick={() => removeTaskHandler(el.id)}>X</button>*/}
                        </div>
                    )
                })}
            </div>
            <div>
                <Button variant={filter==='All' ? "contained" : "outlined"}
                        color="success" onClick={addFilterAllTaskHandler}>All</Button>

                <Button variant={filter==='Active' ? "contained" : "outlined"}
                        color="error" onClick={addFilterActiveTaskHandler}>Active</Button>

                <Button variant={filter==='Completed' ? "contained" : "outlined"}
                        color="primary" onClick={addFilterCompletedTaskHandler}>Completed</Button>

                {/*<Button name={'All'} filter={filter} callBack={() => addFilterTaskHandler(todoListId, 'All')}/>

                <Button name={'Active'} filter={filter} callBack={() => addFilterTaskHandler(todoListId, 'Active')}/>
                <Button name={'Completed'} filter={filter}
                        callBack={() => addFilterTaskHandler(todoListId, 'Completed')}/>*/}
            </div>
        </div>
    )
}

// Video: 7 time: 49.10