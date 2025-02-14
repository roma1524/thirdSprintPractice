import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {todolistsSelect} from "@/features/model/todolists-selectors.ts";
import {Grid, Paper} from "@mui/material";
import {TodolistItem} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx";
import {TodolistsType} from "@/features/model/todolists-reducer.ts";

export const Todolists = () => {

    const todolists = useAppSelector(todolistsSelect)

    return (
        <>
            {todolists.map((todolist: TodolistsType) => {
                return (
                    <Grid key={todolist.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                            <TodolistItem todolist={todolist}/>
                        </Paper>
                    </Grid>
                )
            })}
        </>
    )
}