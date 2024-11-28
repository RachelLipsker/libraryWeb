import React from 'react';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import { MenuProvider } from './menu/MenuProvider';
import RightNav from './rightNav';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routerModel';
import { useCurrentUser } from '../../users/providers/UserProvider';

export default function Header() {
    const navigate = useNavigate();
    const { user } = useCurrentUser();

    return (
        <MenuProvider>
            <AppBar position="static" elevation={0} sx={{ backgroundColor: "#eee", color: "black" }}>
                <Toolbar>
                    <RightNav />

                    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                        <Box
                            component="img"
                            src="/images/logo.png"
                            alt="books"
                            sx={{ height: 70 }}
                            onClick={() => navigate(ROUTES.ROOT)}
                        />
                    </Box>
                </Toolbar>


                {user?.isAdmin && <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "#f5f5f5",
                        padding: "8px",
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{ margin: 1, backgroundColor: "#F96C68" }}
                        onClick={() => navigate(ROUTES.ROOT)}
                    >
                        ניהול ספרים
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ margin: 1, backgroundColor: "#F96C68" }}
                        onClick={() => navigate(ROUTES.BORROWINGS_MANAGEMENT)}
                    >
                        ניהול השאלות
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ margin: 1, backgroundColor: "#F96C68" }}
                        onClick={() => navigate(ROUTES.USERS)}
                    >
                        ניהול משתמשים
                    </Button>
                </Box>}

            </AppBar>
        </MenuProvider>
    );
}
