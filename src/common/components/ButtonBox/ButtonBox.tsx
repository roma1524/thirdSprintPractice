import {changeFilterAC, TodolistsType} from '@/features/model/todolists-reducer.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';

type Props = {
    todolist: TodolistsType
}

export const ButtonBox = ({todolist}: Props) => {
    const { id, filter} = todolist
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

    return (
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
    )
}