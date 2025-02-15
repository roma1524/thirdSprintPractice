import {TaskType} from '@/Todolists/Todolists.tsx';
import {useState} from 'react';

type Props = {
    tasksState: TaskType[]
    changeTaskTitle: (payload: {todolistId: string, taskId: string, title: string}) => void
}

export const TodolistItem = ({tasksState}: Props) => {

    const [titleValue, setTitleValue] = useState<string>('');

    const changeTaskTitleHandler = () => {

    }

    return (
        <>
            <div>
                <input
                    type="text"
                    value={titleValue}
                />
                <button>Add</button>
            </div>
            {tasksState.map(td => (
                <li key={td.id}>
                    <input
                        type="checkbox"
                        checked={td.isDone}
                    />
                    <span>{td.title}</span>
                    <button>X</button>
                </li>
            ))}
        </>
    )
}