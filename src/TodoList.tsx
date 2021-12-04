import React from 'react'
import {filterType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    addFilter: (value:filterType) => void
    // filterAllTask: (tasks: Array<TaskType>) => void
    // filterActiveTask: () => void
    // filterCompletedTask: () => void
}
export const TodoList: React.FC<TodoListPropsType> = ({
                                                          title, tasks,
                                                          removeTask,
                                                          addFilter
                                                      }) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
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
                            <button onClick={() => removeTask(el.id)}>
                                X
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => addFilter('All')}>All</button>
                <button onClick={() => addFilter('Active')}>Active</button>
                <button onClick={() => addFilter('Completed')}>Completed</button>
            </div>
        </div>
    )
}