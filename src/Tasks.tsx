import {ChangeEvent} from "react";
import {EditableSpan} from "@/EditableSpan.tsx";
import {TodolistsType} from "@/model/todolists-reducer.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import { tasksSelect } from "./model/tasks-selectors";
import {changeStatusAC, changeTaskTitleAC, removeTaskAC, TasksType} from "@/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type Props = {
    todolist: TodolistsType
}

export const Tasks = ({todolist}: Props) => {
    const { id, title, filter} = todolist
    const tasks = useAppSelector(tasksSelect)

    const dispatch = useAppDispatch()


    function removeTask(payload: { todolistId: string, taskId: string }) {
        dispatch(removeTaskAC({todolistId: payload.todolistId, taskId: payload.taskId}))
    }

    function changeTaskStatus(payload: { todolistId: string, taskId: string, newIsDone: boolean }) {
        dispatch(changeStatusAC({todolistId: payload.todolistId, taskId: payload.taskId, newIsDone: payload.newIsDone}))
    }

    function changeTaskTitle(payload: { todolistId: string, title: string, taskId: string }) {
        dispatch(changeTaskTitleAC({todolistId: payload.todolistId, taskId: payload.taskId, title: payload.title}))
    }

    let tasksForTodolist = tasks[id];
    if (filter === "Active") {
        tasksForTodolist = tasks[id].filter((t: TasksType) => t.isDone === false);
    }
    if (filter === "Completed") {
        tasksForTodolist = tasks[id].filter((t: TasksType) => t.isDone === true);
    }

    return (
        <>
            <ul>
                {tasksForTodolist.length === 0 ? 'have no massages'
                    :
                    tasksForTodolist.map((t: TasksType) => {
                        const onClickHandler = () => removeTask({todolistId: id, taskId: t.id})
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus({
                                todolistId: id,
                                taskId: t.id,
                                newIsDone: e.currentTarget.checked
                            });
                        }
                        const changeTitleTask = (title: string) => {
                            changeTaskTitle({title, taskId: t.id, todolistId: id})
                        }

                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       onChange={onChangeHandler}
                                       checked={t.isDone}/>

                                <EditableSpan title={t.title} callback={changeTitleTask}/>
                                <button onClick={onClickHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}