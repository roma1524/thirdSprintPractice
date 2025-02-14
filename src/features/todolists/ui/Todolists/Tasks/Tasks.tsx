import {TodolistsType} from "@/features/model/todolists-reducer.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {tasksSelect} from "@/features/model/tasks-selectors.ts";
import {TasksType} from "@/features/model/tasks-reducer.ts";
import {TaskItem} from '@/features/todolists/ui/Todolists/Tasks/TaskItem/TaskItem.tsx';

type Props = {
    todolist: TodolistsType
}

export const Tasks = ({todolist}: Props) => {
    const { id, filter} = todolist
    const tasks = useAppSelector(tasksSelect)

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
                    tasksForTodolist.map((task: TasksType) => {
                      return (
                          <TaskItem key={task.id} task={task} todolistId={id}/>
                      )
                    })
                }
            </ul>
        </>
    )
}