import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType = {
    newTitle: string
    setNewTitle: (newTitle: string) => void
    addTask: (title: string) => void
}
export const Input = ({newTitle, setNewTitle, addTask, ...props}: InputPropsType) => {

    const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        // if (e.ctrlKey) {
        if (e.key === 'Enter') {
            addTask(newTitle)
            setNewTitle('')
        }
    }

    return (
        <input value={newTitle}
               onChange={onChangeTaskHandler}
               onKeyPress={onKeyPressTaskHandler}/>

    );
};
