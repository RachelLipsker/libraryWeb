import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

export default function Header() {
    return (
        <AppBar position="static" elevation={0} sx={{ backgroundColor: "#eee", color: "black" }}>
            <Toolbar>
                {/* אייקון סמיילי בצד שמאל */}
                <EmojiEmotionsIcon sx={{ mr: "auto" }} />

                {/* לוגו במרכז */}
                <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                    <Box
                        component="img"
                        src="/books.png"
                        alt="books"
                        sx={{ height: 50 }} // התאמת גובה התמונה
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
}
