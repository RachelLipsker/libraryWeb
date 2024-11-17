import React from 'react';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useCurrentUser } from '../../users/providers/UserProvider';
import NavLink from '../../components/NavLink';
import ROUTES from '../../routes/routerModel';
import { MenuProvider } from './menu/MenuProvider';
import RightNav from './rightNav';

export default function Header() {
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
                        />
                    </Box>
                </Toolbar>
            </AppBar>
        </MenuProvider>
    );
}
