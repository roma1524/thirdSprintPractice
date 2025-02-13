import {RootState} from "@/app/store.ts";
import {TasksType} from "@/app/App.tsx";

export const tasksSelect = (state: RootState): TasksType => state.tasks