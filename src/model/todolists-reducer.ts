import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

export type FilterValuesType = "All" | "Active" | "Completed";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const initialState: TodolistsType[] = [];

export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
    return {payload: {id: nanoid(), title}}
})
export const removeTodolistAC = createAction<{todolistId: string}>('todolists/removeTodolist')
export const changeFilterAC = createAction<{todolistId: string, filter: FilterValuesType}>('todolists/changeFilter')
export const changeTodolistTitleAC = createAction<{todolistId: string, title: string}>('todolists/changeTodolistTitle')

export const todolistsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(createTodolistAC, (state, action) => {
            state.push({...action.payload, filter: 'All'})
        })
        .addCase(removeTodolistAC, (state, action) => {
            const indexCurrentTodolist = state.findIndex(tdList => tdList.id === action.payload.todolistId)

            if (indexCurrentTodolist !== -1) {
                state.splice(indexCurrentTodolist, 1)
            }
        })
        .addCase(changeFilterAC, (state, action) => {
            const CurrentTodolist = state.find(tdList => tdList.id === action.payload.todolistId)

            if (CurrentTodolist) {
                CurrentTodolist.filter = action.payload.filter
            }
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const CurrentTodolist = state.find(tdList => tdList.id === action.payload.todolistId)

            if (CurrentTodolist) {
                CurrentTodolist.title = action.payload.title
            }
        })
})