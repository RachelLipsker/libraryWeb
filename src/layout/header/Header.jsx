import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import { MenuProvider } from './menu/MenuProvider';
import RightNav from './rightNav';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routerModel';

export default function Header() {
    const navigate = useNavigate();
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
            </AppBar>
        </MenuProvider>
    );
}
