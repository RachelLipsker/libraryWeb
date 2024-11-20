import React, { useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Grid, Divider } from '@mui/material';
import useUsers from '../hooks/useUsers';
import { useCurrentUser } from '../providers/UserProvider';
import { Link, Navigate } from 'react-router-dom';
import ROUTES from '../../routes/routerModel';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';

export default function ProfilePage() {
    const { user } = useCurrentUser();
    const { getUserById, profile, isLoading, error } = useUsers();

    useEffect(() => {
        if (user) {
            getUserById(user._id);
        }
    }, [user]);

    if (!user) return <Navigate to={ROUTES.ROOT} replace />;
    if (isLoading) return <Spinner />;
    if (error) return <Error errorMessage={error} />;

    return (
        <Box sx={{ maxWidth: '1200px', margin: 'auto', p: 3, direction: 'rtl' }}>

            {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}> */}
            <Card sx={{ display: "flex", mb: 3, borderRadius: 2, boxShadow: 2, justifyContent: "space-between" }}>
                {/* User's Details and Edit Button */}
                <CardContent sx={{ flexGrow: 1 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 2,
                        }}
                    >
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            {profile.firstName} {profile.lastName}
                        </Typography>
                        <Button variant="contained" sx={{ fontWeight: 'bold', backgroundColor: "#F68832" }}>
                            ערוך פרופיל
                        </Button>
                    </Box>
                    {profile.isAdmin ? <Typography
                        variant="body2"
                        sx={{
                            textAlign: 'right', mx: 1, color: "#91D2F1"
                        }}
                    >
                        משתמש מנהל
                    </Typography> : null}
                    <Typography variant="body1" sx={{ textAlign: 'right', m: 1 }}>
                        אימייל: {profile.email}
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: 'right', m: 1 }}>
                        טלפון: {profile.phone}
                    </Typography>
                    <Divider />
                    <Box sx={{ display: "flex" }}>
                        <Typography variant="body1" sx={{ textAlign: 'right', m: 1 }}>
                            ספרים להזמנה: {profile.booksToOrder}
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'right', m: 1 }}>
                            ספרים להשאלה: {profile.booksToBorrowing}
                        </Typography>
                    </Box>

                </CardContent>

                <CardMedia
                    component="img"
                    sx={{
                        width: 170,
                        height: 170,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        margin: 3,
                    }}
                    image={profile.image}
                    alt={profile.alt}
                />
            </Card>

            {/* </Box> */}

            {/* Books the User Currently Holds */}
            <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                        הספרים אצלי
                    </Typography>
                    {profile.orders.length > 0 ? (
                        profile.orders.map((order, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                                <Typography variant="body1" sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                                    {order.bookTitle}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ textAlign: 'right' }}
                                >
                                    תאריך הזמנה: {new Date(order.orderDate).toLocaleDateString()}
                                </Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ textAlign: 'right' }}
                        >
                            אין ספרים אצלי
                        </Typography>
                    )}
                </CardContent>
            </Card>

            {/* Borrowing and Order Information */}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                                ספרים בהזמנה
                            </Typography>
                            {profile.openBorrowings.length > 0 ? (
                                profile.openBorrowings.map((borrow, index) => (
                                    <Box key={index} sx={{ mb: 2 }}>
                                        <Typography
                                            variant="body1"
                                            sx={{ textAlign: 'right', fontWeight: 'bold' }}
                                        >
                                            {borrow.bookTitle}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ textAlign: 'right' }}
                                        >
                                            תאריך החזרה: {new Date(borrow.finalDateToReturn).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                ))
                            ) : (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ textAlign: 'right' }}
                                >
                                    אין ספרים בהשאלה
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                                השאלות אחרונות
                            </Typography>
                            {profile.openBorrowings.length > 0 ? (
                                profile.openBorrowings.slice(0, 3).map((borrow, index) => (
                                    <Box key={index} sx={{ mb: 2 }}>
                                        <Typography
                                            variant="body1"
                                            sx={{ textAlign: 'right', fontWeight: 'bold' }}
                                        >
                                            {borrow.bookTitle}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ textAlign: 'right' }}
                                        >
                                            תאריך החזרה: {new Date(borrow.finalDateToReturn).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                ))
                            ) : (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ textAlign: 'right' }}
                                >
                                    אין השאלות אחרונות
                                </Typography>
                            )}
                            <Link to="/borrowings" style={{ textDecoration: 'none' }}>
                                <Button variant="outlined" color="primary" sx={{ width: '100%', marginTop: 2, color: "#91D2F1" }}>
                                    כל ההשאלות
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box >
    );
}
