import {AppBar, Button, Container, IconButton, Switch, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {containerSx} from "@/container.styles.ts";

export const Header = () => {

    return (
        <AppBar position="static" sx={{mb: '30px'}}>
            <Toolbar>
                <Container maxWidth={'lg'} sx={containerSx}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <Button variant="contained">Sign In</Button>
                        <Button variant="contained">Sign Up</Button>
                        {/*<Button background={theme.palette.primary.dark}>Faq</Button>*/}
                        <Switch color='default' />
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    )
}