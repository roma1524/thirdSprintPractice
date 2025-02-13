import {RootState} from "@/app/store.ts";
import {TodolistsType} from "@/app/App.tsx";

export const todolistsSelect = (state: RootState): TodolistsType => state.todolists