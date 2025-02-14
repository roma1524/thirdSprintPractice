import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm.tsx";
import {addTaskAC} from "@/features/model/tasks-reducer.ts";
import {changeTodolistTitleAC, removeTodolistAC, TodolistsType} from "@/features/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Tasks} from "@/features/todolists/ui/Todolists/Tasks/Tasks.tsx";
import {ButtonBox} from '@/common/components/ButtonBox/ButtonBox.tsx';

type Props = {
    todolist: TodolistsType
}

export function TodolistItem({todolist}: Props) {
    const { id, title } = todolist

    const dispatch = useAppDispatch()

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
        <ButtonBox todolist={todolist}/>
    </div>
}
