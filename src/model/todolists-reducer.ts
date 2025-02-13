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

export const todolistsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(createTodolistAC, (state, action) => {
            state.push({...action.payload, filter: 'All'})
        })
})