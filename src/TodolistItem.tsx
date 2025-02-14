import {EditableSpan} from "@/EditableSpan.tsx";
import {CreateItemForm} from "@/CreateItemForm.tsx";
import {addTaskAC} from "@/model/tasks-reducer.ts";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC, TodolistsType} from "@/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Tasks} from "@/Tasks.tsx";

type Props = {
    todolist: TodolistsType
}

export function TodolistItem({todolist}: Props) {
    const { id, title, filter} = todolist

    const dispatch = useAppDispatch()

    const onAllClick = () => {
        dispatch(changeFilterAC({todolistId: id, filter: "All"}))
    }
    const onActiveClick = () => {
        dispatch(changeFilterAC({todolistId: id, filter: "Active"}))
    }
    const onCompletedClick = () => {
        dispatch(changeFilterAC({todolistId: id, filter: "Completed"}))
    }

    const removeTodolist = () => {
        dispatch(removeTodolistAC({todolistId: id}))
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC({todolistId: id, title}))
    }
    const createTaskItem = (newTitle: string) => {
        dispatch(addTaskAC({todolistId: id, title: newTitle}))
    }



    return <div>
        <h3>
            <EditableSpan title={title} callback={changeTodolistTitle}/>
            <button onClick={removeTodolist}>X</button>
        </h3>

        <CreateItemForm createItem={createTaskItem}/>

        <Tasks todolist={todolist}/>


        <div>
            <button className={filter === 'All' ? "active-filter" : ""}
                    onClick={onAllClick}>All
            </button>
            <button className={filter === 'Active' ? "active-filter" : ""}
                    onClick={onActiveClick}>Active
            </button>
            <button className={filter === 'Completed' ? "active-filter" : ""}
                    onClick={onCompletedClick}>Completed
            </button>
        </div>
    </div>
}
