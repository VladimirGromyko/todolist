import React from "react"

type ButtonPropsType = {
    name: string
    callBack: () => void
}
export const Button = ({name, callBack, ...props}: ButtonPropsType) => {
    const onClickHandler = () => {
        callBack()
    }
    return <button onClick={onClickHandler}>{name}</button>
}