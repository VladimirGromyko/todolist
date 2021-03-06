import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './../TodoList.module.css'
import {Button, TextField} from "@mui/material";

type AddItemFormPropsType = {
    addTask: (title: string) => void
}
export const AddItemForm = ({addTask, ...props}: AddItemFormPropsType) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | boolean>('Title is required')

    const addTaskHandler = () => {
        let trimNewTitle = newTitle.trim()
        if (trimNewTitle && trimNewTitle.length < 15) {
            addTask(trimNewTitle)
            setNewTitle('')
            setError('Title is required')
        } else if (trimNewTitle.length > 15) {
        } else {
            setError('Title is required')
            setNewTitle('')
        }
    }

    const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)

        if (e.currentTarget.value.trim().length < 1) {
            setError('No title! Please enter title')
        } else if (newTitle.trim().length >= 15) {
            setError('Title is too long')
        } else {
            setError(false)
        }
    }

    const onKeyPressTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        // if (e.ctrlKey) {
        if (e.key === 'Enter') {
            if (newTitle.trim().length < 15) {
                addTaskHandler()
                setNewTitle('')
                setError('Title is required')
            }
        }
    }

    return (
        <div>
            <TextField id="outlined-basic"
                       label={error}
                       variant="outlined"
                       size="small"
                       error={!!error}
                       value={newTitle}
                       className={error ? s.error : s.nonError}
                       onChange={onChangeTaskHandler}
                       onKeyPress={onKeyPressTaskHandler}
            />

            <Button
                onClick={addTaskHandler}
                style={{maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px'}}
                variant="contained">+</Button>
            {error && <div className={s.errorMessage}></div>}
        </div>
    )
}
