import { Box, Typography } from '@mui/material'
import React from 'react'
import CopyrightIcon from '@mui/icons-material/Copyright';

export default function Footer() {
    return (
        <>
            <Box sx={{ backgroundColor: "#eee", p: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <CopyrightIcon />
                <Typography>Rachel Lipsker</Typography>

            </Box>
        </>
    )
}
