import {v1} from 'uuid';
import {useState} from 'react';
import {TodolistItem} from '@/Todolists/TodolistItem/TodolistItem.tsx';
import s from './Todolists.module.css'

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistType = {
    tdId: string
    title: string
    filter: FilterType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksState = {
    [key: string]: TaskType[]
}

export const Todolists = () => {

    const tdId1 = v1();
    const tdId2 = v1();

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {tdId: tdId1, title: 'Films', filter: 'all'},
        {tdId: tdId2, title: 'Books', filter: 'completed'},
    ])
    const [tasks, setTasks] = useState<TasksState>({
        [tdId1]: [
            {id: v1(), title: 'Bond', isDone: false},
            {id: v1(), title: 'Born', isDone: false},
            {id: v1(), title: 'Tor', isDone: true},
            {id: v1(), title: 'Spider', isDone: false}
        ],
        [tdId2]: [
            {id: v1(), title: '50', isDone: true},
            {id: v1(), title: 'Code', isDone: false},
            {id: v1(), title: 'React', isDone: false}
        ]
    })

    const changeTaskTitle = (payload: { todolistId: string, taskId: string, title: string }) => {
        setTasks({
            ...tasks,
            [payload.todolistId]: tasks[payload.todolistId].map(el => el.id === payload.taskId ? {
                ...el,
                title: payload.title
            } : el)
        })
    }

    const createTask = (payload: { tdId: string, title: string }) => {
        const task = {id: v1(), title: payload.title, isDone: false}
        setTasks({...tasks, [payload.tdId]: [...tasks[payload.tdId], task]})
    }

    const deleteTask = (payload: { tdId: string, taskId: string }) => {
        setTasks({...tasks, [payload.tdId]: tasks[payload.tdId].filter(el => el.id !== payload.taskId)})
    }

    const onChangeTaskStatus = (payload: { tdId: string; taskId: string, newIsDone: boolean }) => {
        setTasks({...tasks, [payload.tdId]: tasks[payload.tdId].map(task => task.id === payload.taskId ? {...task, isDone: payload.newIsDone} : task)})
    }

    return (
        <div className={s.todolists}>
            {todolists.map(td => {
                let arrayOfTasks = tasks[td.tdId];
                return (
                    <div>
                        <h3>{td.title}</h3>
                        <TodolistItem
                            key={td.tdId}
                            todolist={td}
                            tasksState={arrayOfTasks}
                            changeTaskTitle={changeTaskTitle}
                            createTask={createTask}
                            deleteTask={deleteTask}
                            onChangeTaskStatus={onChangeTaskStatus}
                        />
                    </div>
                )
            })}
        </div>
    )
}