import { Box, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NavLink({ to, sx, children }) {
    const navigate = useNavigate();
    return (
        <Box onClick={() => navigate(to)}>
            <Typography sx={sx}>{children}</Typography>
        </Box>
    )
}
