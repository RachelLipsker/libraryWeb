import React, { useEffect } from 'react';
import useUsers from '../../users/hooks/useUsers';
import useBooks from '../../books/hooks/useBooks';
import useBorrowings from '../hooks/useBorrowings';
import DoBorrowings from '../components/DoBorrowings';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import Borrowings from '../components/Borrowings';
import { useCurrentUser } from '../../users/providers/UserProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routerModel';
import PageHeader from '../../components/PageHeader';
import { Box, Button } from '@mui/material';

export default function BorrowingsPage() {
    const { users, getAllUsers, setUsers, isLoading, error } = useUsers();
    const { books, getAllBooks, setBooks } = useBooks();
    const { onBorrow, onReturn, borrowings } = useBorrowings();
    const { user } = useCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        getAllBooks();
        getAllUsers();
    }, []);

    const handleBorrow = async (userId, bookId) => {
        const { book, user } = await onBorrow(userId, bookId);
        setBooks(prevBooks => prevBooks.map(prevbook => prevbook._id === book._id ? book : prevbook));
        setUsers(prevUsers => prevUsers.map(prevuser => prevuser._id === user._id ? user : prevuser));
    };

    const handleReturn = async (userId, bookId) => {
        const { book, user } = await onReturn(userId, bookId);
        setBooks(prevBooks => prevBooks.map(prevbook => prevbook._id === book._id ? book : prevbook));
        setUsers(prevUsers => prevUsers.map(prevuser => prevuser._id === user._id ? user : prevuser));
    };

    if (isLoading) return <Spinner />;
    if (error) return <Error errorMessage={error} />;
    if (!user?.isAdmin) return <Navigate to={ROUTES.ROOT} replace />;

    return (
        <>
            <PageHeader title="ניהול השאלות" />
            <DoBorrowings
                users={users}
                books={books}
                onBorrow={handleBorrow}
                onReturn={handleReturn}
            />

            <Borrowings borrowings={borrowings} />

            {/* כפתורים בתחתית הדף */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between', // כפתורים מחולקים שווה בשווה
                    gap: 2, // רווח בין הכפתורים
                    marginTop: 3, // ריווח למעלה
                    paddingBottom: 2, // ריווח למטה
                    width: '100%', // גודל מקסימלי
                }}
            >
                <Button
                    variant="outlined"
                    fullWidth
                    sx={{ color: "#91D2F1" }}
                    onClick={() => navigate(ROUTES.BORROWINGS_HISTORY)}
                >
                    לכל ההשאלות
                </Button>
                <Button
                    variant="outlined"
                    fullWidth
                    sx={{ color: "#91D2F1" }}
                    onClick={() => navigate(ROUTES.OPEN_BORROWINGS)}
                >
                    לכל ההשאלות הפתוחות
                </Button>
                <Button
                    variant="outlined"
                    fullWidth
                    sx={{ color: "#91D2F1" }}
                    onClick={() => navigate(ROUTES.LATE_BORROWINGS)}
                >
                    לכל ההשאלות באיחור
                </Button>
            </Box>
        </>
    );
}
