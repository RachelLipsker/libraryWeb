import React, { useEffect } from 'react'
import useBooks from '../hooks/useBooks';
import BooksFeedback from '../components/BooksFeedback';
import { useCurrentUser } from '../../users/providers/UserProvider';
import useUsers from '../../users/hooks/useUsers';
import AddButton from '../../components/AddButton';
import AllAuthors from '../../authors/components/AllAuthors';
import AllGenres from '../../genres/components/AllGenres';
export default function BooksPage() {
    const { books, getAllBooks, isLoading, error, handleLike, handleOrder, handleDeleteBook } =
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

            {user?.isAdmin ? <>
                <AllAuthors books={books} />
                <AllGenres books={books} />
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
        </>
    )
}
