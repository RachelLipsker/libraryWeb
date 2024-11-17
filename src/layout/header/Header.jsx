import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

export default function Header() {
    return (
        <AppBar position="static" elevation={0} sx={{ backgroundColor: "#eee", color: "black" }}>
            <Toolbar>
                <EmojiEmotionsIcon sx={{ mr: "auto" }} />

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
    );
}
