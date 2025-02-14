import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
import {createTodolistAC} from "@/features/model/todolists-reducer.ts";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: TasksType[]
}

const initialState: TasksStateType = {}

export const removeTaskAC = createAction<{ todolistId: string, taskId: string }>('tasks/removeTask')
export const addTaskAC = createAction<{ todolistId: string, title: string }>('tasks/addTask')
export const changeStatusAC = createAction<{ todolistId: string, taskId: string, newIsDone: boolean }>('tasks/changeStatus')
export const changeTaskTitleAC = createAction<{ todolistId: string, taskId: string, title: string }>('tasks/changeTaskTitle')

export const tasksReducer = createReducer(initialState,  (builder) => {
    builder
        .addCase(removeTaskAC, (state, action) => {
            const indexOfTask = state[action.payload.todolistId].findIndex(el => el.id === action.payload.taskId)
            if (indexOfTask !== -1) {
                state[action.payload.todolistId].splice(indexOfTask, 1)
            }
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(addTaskAC, (state, action) => {
            const newTask = {id: nanoid(), title: action.payload.title, isDone: false}
            state[action.payload.todolistId].unshift(newTask)
        })
        .addCase(changeStatusAC, (state, action) => {
            const currentTask = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
            if (currentTask) {
                currentTask.isDone = action.payload.newIsDone
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const currentTask = state[action.payload.todolistId].find(task => task.id === action.payload.taskId)
            if (currentTask) {
                currentTask.title = action.payload.title
            }
        })
})