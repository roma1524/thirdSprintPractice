import {TaskType} from '@/Todolists/Todolists.tsx';
import {ChangeEventHandler, useState} from 'react';

type Props = {
    tdId: string
    tasksState: TaskType[]
    deleteTask: (payload: { tdId: string, taskId: string }) => void
    createTask: (payload: { tdId: string, title: string }) => void
    onChangeTaskStatus: (payload: { tdId: string, taskId: string, newIsDone: boolean }) => void
}

export const Tasks = (props: Props) => {

    const [titleValue, setTitleValue] = useState<string>('');

    const changeTaskTitleHandler = () => {

    }

    const createTaskHandler = () => {
        let inputVal = titleValue.trim();
        if(inputVal !== '') {
            props.createTask({tdId: props.tdId, title: titleValue})
            setTitleValue('')
        } else {
            // setError('')
            setTitleValue('')
        }
    }

    const onChangeTitleHandler = (e: ChangeEventHandler<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value)
    }

    const onBlurHandler = () => {}

    return (
        <ul>
            <div>
                <input
                    type="text"
                    value={titleValue}
                    onChange={onChangeTitleHandler}
                />
                <button onClick={createTaskHandler}>Add</button>
            </div>

            {props.tasksState.length > 0 ?
                props.tasksState.map(task => {

                    const deleteTaskHandler = () => {
                        props.deleteTask({tdId: props.tdId, taskId: task.id})
                    }

                    const onChangeTaskStatusHandler = (e: ChangeEventHandler<HTMLInputElement>) => {
                        props.onChangeTaskStatus({
                            tdId: props.tdId,
                            taskId: task.id,
                            newIsDone: e.currentTarget.checked
                        })
                    }

                    return (
                        <li key={task.id}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={onChangeTaskStatusHandler}
                                onBlur={onBlurHandler}
                            />
                            <span>{task.title}</span>
                            <button onClick={deleteTaskHandler}>X</button>
                        </li>
                    )
                }) : 'Tasks not found'
            }
        </ul>
    )
}