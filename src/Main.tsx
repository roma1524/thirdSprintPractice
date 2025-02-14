import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {CreateItemForm} from "@/CreateItemForm.tsx";
import {createTodolistAC} from "@/model/todolists-reducer.ts";
import {Container, Grid} from "@mui/material";
import {Todolists} from "@/Todolists.tsx";


export const Main = () => {

    const dispatch = useAppDispatch()

    function createTodolist(title: string) {
        dispatch(createTodolistAC(title))
    }

    return (
        <Container maxWidth={'lg'}>
            <Grid container sx={{mb: '30px'}}>
                <CreateItemForm createItem={createTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                <Todolists/>
            </Grid>
        </Container>
    )
}