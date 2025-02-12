import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    createItem: (title: string) => void;
}

export const CreateItemForm = (props: Props) => {

    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== '') {
            props.createItem(title)
        } else {
            setError('Так не пойдёт, надо что-то написать!')
        }
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask()
        }
    }

    return (
        <>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </>
    )
}