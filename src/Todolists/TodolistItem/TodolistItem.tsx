import {TaskType, TodolistType} from '@/Todolists/Todolists.tsx';
import {Tasks} from '@/Todolists/TodolistItem/Tasks/Tasks.tsx';
import s from './'

type Props = {
    todolist: TodolistType
    tasksState: TaskType[]
    changeTaskTitle: (payload: { todolistId: string, taskId: string, title: string }) => void
    createTask: (payload: { tdId: string, title: string }) => void
    deleteTask: (payload: { tdId: string, taskId: string }) => void
    onChangeTaskStatus: (payload: { tdId: string, taskId: string, newIsDone: boolean }) => void
}

export const TodolistItem = (props: Props) => {

    let tasksArray = props.tasksState;
    let filteredTasksArray = tasksArray;
    if (props.todolist.filter === 'active') {
        filteredTasksArray.filter(t => t.isDone === false)
    }
    if (props.todolist.filter === 'completed') {
        filteredTasksArray.filter(t => t.isDone === true)
    }

    return (
        <Tasks
            key={props.todolist.tdId}
            tdId={props.todolist.tdId}
            tasksState={filteredTasksArray}
            deleteTask={props.deleteTask}
            createTask={props.createTask}
            onChangeTaskStatus={props.onChangeTaskStatus}
        />
    )
}