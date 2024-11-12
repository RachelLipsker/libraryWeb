import React from 'react'
import { Box } from '@mui/material'
import Header from './header/Header'
import Footer from './footer/Footer'

export default function Layout({ children }) {
    return (
        <Box display="flex" flexDirection="column" minHeight="98vh">
            <Header />
            <Box component="main" flex="1">
                {children}
            </Box>
            <Footer />
        </Box>
    )
}
