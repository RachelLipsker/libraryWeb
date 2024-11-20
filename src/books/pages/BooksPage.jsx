import React, { useEffect } from 'react'
import useBooks from '../hooks/useBooks';
import BooksFeedback from '../components/BooksFeedback';
import { useCurrentUser } from '../../users/providers/UserProvider';
import useUsers from '../../users/hooks/useUsers';
import AllAuthors from '../../authors/components/AllAuthors';
import AllGenres from '../../genres/components/AllGenres';
import {
    Box
} from "@mui/material";
import AddNewBookButton from '../components/AddNewBookButton';
import ResetOrders from '../components/ResetOrders';


export default function BooksPage() {
    const { books, getAllBooks, isLoading, error, handleLike, handleOrder, handleDeleteBook, handleResetOrders } =
        useBooks();
    const { user } = useCurrentUser();
    const { profile, getUserById } = useUsers();
    useEffect(() => {
        getAllBooks();
        if (user) {
            getUserById(user._id);
        }
    }, [user]);
    return (
        <>
            <Box sx={{ display: "flex", alignItems: "start", mt: 2 }}>
                {user?.isAdmin ? <>
                    <Box>
                        <ResetOrders handleResetOrders={handleResetOrders} />
                        <AllAuthors books={books} />
                        <AllGenres books={books} />
                    </Box>
                </> : null}
                <BooksFeedback
                    books={books}
                    isLoading={isLoading}
                    error={error}
                    handleLike={handleLike}
                    handleOrder={handleOrder}
                    profile={profile}
                    handleDeleteBook={handleDeleteBook}
                />
            </Box>

            {user?.isAdmin ? <AddNewBookButton /> : null}
        </>
    )
}
