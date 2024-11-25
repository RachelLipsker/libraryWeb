import React, { useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Grid, Divider } from '@mui/material';
import useUsers from '../hooks/useUsers';
import { useCurrentUser } from '../providers/UserProvider';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import ROUTES from '../../routes/routerModel';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import useBorrowings from '../../borrowings/hooks/useBorrowings';
import Borrowings from '../../borrowings/components/Borrowings';

export default function ProfilePage() {
    const { id } = useParams();
    const { user } = useCurrentUser();
    const { getUserById, profile, isLoading, error } = useUsers();
    const { getLastUserBorrowings, borrowings } = useBorrowings();
    const navigate = useNavigate();

    useEffect(() => {
        getUserById(id);
        getLastUserBorrowings(id);
    }, [id]);

    if (!user || (user?._id != id && !user?.isAdmin)) return <Navigate to={ROUTES.ROOT} replace />;
    if (isLoading) return <Spinner />;
    if (error) return <Error errorMessage={error} />;

    return (
        <Box sx={{ maxWidth: '1200px', margin: 'auto', p: 3, direction: 'rtl' }}>

            <Card sx={{ display: "flex", mb: 3, borderRadius: 2, boxShadow: 2, justifyContent: "space-between" }}>
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
                        {user._id == id ? <Button
                            variant="contained"
                            sx={{ fontWeight: 'bold', backgroundColor: "#F68832" }}
                            onClick={() => navigate(ROUTES.EDIT_PROFILE + "/" + id)}>
                            ערוך פרופיל
                        </Button> : null}

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

            <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                        ספרים מושאלים
                    </Typography>
                    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                        {profile.openBorrowings.length > 0 ? (
                            profile.openBorrowings.map((borrow, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row", // תמונה מימין
                                        alignItems: "center",
                                        mb: 2,
                                        gap: 3, // רווח בין התמונה לתוכן
                                        textAlign: "right", // יישור כללי לימין
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={borrow.bookImage}
                                        alt={borrow.bookAlt || "תמונה של הספר"}
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: "8px", // עיגול קצוות התמונה
                                            boxShadow: 2, // צל קל
                                        }}
                                    />
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: "bold",
                                                mb: 1, // רווח מתחת לכותרת
                                            }}
                                        >
                                            {borrow.bookTitle}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            תאריך החזרה: {new Date(borrow.finalDateToReturn).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))
                        ) : (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ textAlign: "right" }}
                            >
                                אין ספרים מושאלים
                            </Typography>
                        )}
                    </Box>
                </CardContent>
            </Card>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                                ספרים מוזמנים
                            </Typography>
                            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                                {profile.orders.length > 0 ? (
                                    profile.orders.map((order, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row", // תמונה מימין
                                                alignItems: "center",
                                                mb: 2,
                                                gap: 3, // רווח בין התמונה לתוכן
                                                textAlign: "right", // יישור כללי לימין
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={order.bookImage}
                                                alt={order.bookAlt || "תמונה של הספר"}
                                                sx={{
                                                    width: 80,
                                                    height: 80,
                                                    borderRadius: "8px", // עיגול קצוות התמונה
                                                    boxShadow: 2, // צל קל
                                                }}
                                            />
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        mb: 1, // רווח מתחת לכותרת
                                                    }}
                                                >
                                                    {order.bookTitle}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    תאריך הזמנה: {new Date(order.orderDate).toLocaleDateString()}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))
                                ) : (
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ textAlign: "right" }}
                                    >
                                        אין ספרים מוזמנים
                                    </Typography>
                                )}
                            </Box>

                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                                השאלות אחרונות
                            </Typography>
                            <Borrowings borrowings={borrowings} />
                            <Button
                                variant="outlined"
                                color="primary"
                                sx={{ width: '100%', marginTop: 2, color: "#91D2F1" }}
                                onClick={() => { navigate(ROUTES.USER_HISTORY + "/" + id) }}>
                                כל ההשאלות
                            </Button>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box >
    );
}
