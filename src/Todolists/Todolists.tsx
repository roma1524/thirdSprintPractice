import {v1} from 'uuid';
import {useState} from 'react';
import {TodolistItem} from '@/Todolists/TodolistItem/TodolistItem.tsx';

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
        {tdId: tdId2, title: 'Books', filter: 'all'},
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

    const changeTaskTitle = (payload: {todolistId: string, taskId: string, title: string}) => {
        setTasks({...tasks, [payload.todolistId]: tasks[payload.todolistId].map(el => el.id === payload.taskId ? {...el, title: payload.title} : el)})
    }

    return (
        <div>
            <ul>
                {todolists.map(td => {
                    let arrayOfTasks = tasks[td.tdId]
                    return (
                        <div>
                            <h3>{td.title}</h3>
                            <TodolistItem
                                key={td.tdId}
                                tasksState={arrayOfTasks}
                                changeTaskTitle={changeTaskTitle}
                            />
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}