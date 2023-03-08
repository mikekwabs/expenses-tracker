import { AppBar, Box, Toolbar, Container, Typography, Stack, Button } from "@mui/material";
import { useAuth } from "@/firebase/auth";
import styles from "../styles/navbar.module.scss"


export default function Navbar(){
    //use the context created to obtain the current user.
    const { authUser, signOut } = useAuth();
    return(
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" className={styles.appbar}>
                <Toolbar className={styles.toolbar}>
                    <Container className={styles.container}>
                        <Typography variant="h3" sx={{flexGrow: 1, alignSelf: "center"}}> EXPENSES</Typography>
                            <Stack direction="row" spacing={2} sx={{alignItems: "center"}}>
                                <Typography variant="h6" sx={{flexGrow: 1}}> {authUser?.email} </Typography>
                                <Button variant="outlined"color="error" onClick={signOut}> Logout</Button>
                            </Stack>
                    </Container>
                        
                </Toolbar>
            </AppBar>
        </Box>
    )
}