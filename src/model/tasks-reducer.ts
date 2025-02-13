import {createAction, createReducer} from "@reduxjs/toolkit";
import {createTodolistAC} from "@/model/todolists-reducer.ts";

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

export const tasksReducer = createReducer(initialState,  (builder) => {
    builder
        .addCase(removeTaskAC, (state, action) => {
            const indexOfTask = state[action.payload.todolistId].findIndex(el => el.id === action.payload.taskId)
            if (indexOfTask !== -1) {
                state[action.payload.todolistId].slice(indexOfTask, 1)
            }
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
})