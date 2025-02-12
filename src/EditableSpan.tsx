import {useState} from "react";

type Props = {
    title: string
    callback: (title: string) => void
}

export const EditableSpan = (props: Props) => {
    let [title, setTitle] = useState(props.title);
    let [isEditMode, setIsEditMode] = useState<boolean>(false)

    const turnOnEditMode = () => {
        setIsEditMode(true)
    }
    const turnOffEditMode = () => {
        setIsEditMode(false)
        props.callback(title)
    }

    const onVhangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <>
            {
                isEditMode ?
                    <input type="text"
                           value={title}
                           onChange={onVhangeTitle}
                           onBlur={turnOffEditMode}
                           autoFocus
                    /> :
                    <span onDoubleClick={turnOnEditMode}>{props.title}</span>
            }
        </>

    )
}