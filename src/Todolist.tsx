import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TasksType} from "@/App.tsx";
import {EditableSpan} from "@/EditableSpan.tsx";

type PropsType = {
    todolistId: string
    title: string
    tasks: TasksType[]
    removeTask: (payload: { todolistId: string, taskId: string }) => void
    changeFilter: (payload: { todolistId: string, filter: FilterValuesType }) => void
    addTask: (payload: { todolistId: string, title: string }) => void
    changeTaskStatus: (payload: { todolistId: string, taskId: string, newIsDone: boolean }) => void
    filter: FilterValuesType
    removeTodolist: (payload: { todolistId: string }) => void
    changeTodolistTitle: (payload: { title: string, todolistId: string }) => void
    changeTaskTitle: (payload: { title: string, taskId: string, todolistId: string }) => void
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== '') {
            props.addTask({todolistId: props.todolistId, title: newTitle})
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

    const onAllClickHandler = () => props.changeFilter({todolistId: props.todolistId, filter: "All"});
    const onActiveClickHandler = () => props.changeFilter({todolistId: props.todolistId, filter: "Active"});
    const onCompletedClickHandler = () => props.changeFilter({todolistId: props.todolistId, filter: "Completed"});
    const removeTodolistHandler = () => {
        props.removeTodolist({todolistId: props.todolistId})
    }


    const changeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle({todolistId: props.todolistId, title})
    }


    return <div>
        <h3>
            <EditableSpan title={props.title} callback={changeTodolistTitleHandler}/>
            <button onClick={removeTodolistHandler}>X</button>

        </h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />

            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            { props.tasks.length === 0 ? 'have no massages'
                :
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask({todolistId: props.todolistId, taskId: t.id})
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus({
                            todolistId: props.todolistId,
                            taskId: t.id,
                            newIsDone: e.currentTarget.checked
                        });
                    }
                    const changeTaskTitleHandler = (title: string) => {
                        props.changeTaskTitle({title, taskId: t.id, todolistId: props.todolistId})
                    }

                    return (
                        <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   onChange={onChangeHandler}
                                   checked={t.isDone}/>

                            <EditableSpan title={t.title} callback={changeTaskTitleHandler}/>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'All' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'Active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'Completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
