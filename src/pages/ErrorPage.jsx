import React from 'react'
import PageHeader from '../components/PageHeader'
import { Box, Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../routes/routerModel';

export default function ErrorPage() {
    const navigate = useNavigate();
    return (
        <>
            <PageHeader title="ERROR 404" subtitle="page not found" />
            <Container sx={{
                display: "flex",
                alignItems: "start",
                justifyContent: "space-between",
                mt: 4
            }}>
                <Box>
                    <Typography variant='h5' component="p">oops... the requwsted URL wasn't found on this server.
                    </Typography>
                    <Button onClick={() => navigate(ROUTES.ROOT)}>
                        CLICK HERE TO RETURN TO THE HOME PAGE...
                    </Button>
                </Box>
                <Box
                    component="img"
                    src={"../../public/images/broken-robot-error.png"}
                    alt="an error"
                    sx={{ width: '100%', maxWidth: 340 }}
                />
            </Container>
        </>)
}
