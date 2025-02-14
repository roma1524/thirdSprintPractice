import {ChangeEvent} from 'react';
import {EditableSpan} from '@/common/components/EditableSpan/EditableSpan.tsx';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {changeStatusAC, changeTaskTitleAC, removeTaskAC, TasksType} from '@/features/model/tasks-reducer.ts';

type Props = {
    task: TasksType
    todolistId: string
}

export const TaskItem = ({task, todolistId}: Props) => {

    const dispatch = useAppDispatch()

    function changeTaskTitle(payload: { todolistId: string, title: string, taskId: string }) {
        dispatch(changeTaskTitleAC({todolistId: payload.todolistId, taskId: payload.taskId, title: payload.title}))
    }

    const removeTask = () => dispatch(removeTaskAC({todolistId, taskId: task.id}))

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeStatusAC({todolistId, taskId: task.id, newIsDone: e.currentTarget.checked}))
    }
    const changeTitleTask = (title: string) => {
        changeTaskTitle({title, taskId: task.id, todolistId: todolistId})
    }

    return (
        <li key={task.id} className={task.isDone ? "is-done" : ""}>
            <input type="checkbox"
                   onChange={onChange}
                   checked={task.isDone}/>

            <EditableSpan title={task.title} callback={changeTitleTask}/>
            <button onClick={removeTask}>x</button>
        </li>
    )
}