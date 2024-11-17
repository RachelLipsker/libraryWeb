import { Box, Container, Divider, Typography } from '@mui/material'
import React from 'react'

export default function PageHeader({ title, subtitle }) {
    return (
        <>
            <Box sx={{ p: 2 }}>
                <Typography variant='h2' component="h1" sx={{ textAlign: "center" }}>{title}</Typography>
                <Typography variant='h5' component="h2" sx={{ textAlign: "center" }}>{subtitle}</Typography>
                <Divider sx={{ my: 2 }} />
            </Box>
        </>
    )
}
