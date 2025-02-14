import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, Paper, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
// @ts-ignore
import s from './CreateItemForm.module.css'

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
        <div>
            <Paper elevation={3} className={s.paper}>
                <TextField
                    value={title}
                    id="outlined-basic"
                    label={error ? 'Error' : "Note"}
                    variant="outlined"
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    helperText={error ? "Incorrect entry." : ''}
                    error={!!error}
                />
                <Button
                    onClick={addTask}
                    variant="contained"
                    endIcon={<SendIcon/>}
                >
                    Add
                </Button>
            </Paper>
        </div>
    )
}