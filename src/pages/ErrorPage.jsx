import React from 'react'
import PageHeader from '../components/PageHeader'
import { Box, Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../routes/routerModel';

export default function ErrorPage() {
    const navigate = useNavigate();
    return (
        <>
            <PageHeader title="שגיאה 404" subtitle="הדף לא נמצא" />
            <Container sx={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "start",
                justifyContent: "space-between",
                mt: 4
            }}>
                <Box sx={{ textAlign: "right" }}>
                    <Typography variant='h5' component="p">אופס... הכתובת המבוקשת לא נמצאה
                    </Typography>
                    <Button onClick={() => navigate(ROUTES.ROOT)}>
                        לחץ כאן לחזרה לדף הבית
                    </Button>
                </Box>
                <Box
                    component="img"
                    src={"/images/broken-robot-error.png"}
                    alt="an error"
                    sx={{ width: '100%', maxWidth: 340 }}
                />
            </Container>
        </>)
}
