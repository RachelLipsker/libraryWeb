import React, { useEffect } from 'react'
import useUsers from '../../users/hooks/useUsers'
import useBooks from '../../books/hooks/useBooks';
import useBorrowings from '../hooks/useBorrowings';
import DoBorrowings from '../components/DoBorrowings';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';

export default function BorrowingsPage() {
    const { users, getAllUsers, setUsers, isLoading, error } = useUsers();
    const { books, getAllBooks, setBooks } = useBooks();
    const { onBorrow, onReturn } = useBorrowings();

    useEffect(() => {
        getAllBooks();
        getAllUsers();
    }, [])


    const handleBorrow = async (userId, bookId) => {
        const { book, user } = await onBorrow(userId, bookId);
        setBooks(prevBooks => prevBooks.map(prevbook => prevbook._id == book._id ? book : prevbook));
        setUsers(prevUsers => prevUsers.map(prevuser => prevuser._id === user._id ? user : prevuser));
    };

    const handleReturn = async (userId, bookId) => {
        const { book, user } = await onReturn(userId, bookId);
        setBooks(prevBooks => prevBooks.map(prevbook => prevbook._id === book._id ? book : prevbook));
        setUsers(prevUsers => prevUsers.map(prevuser => prevuser._id === user._id ? user : prevuser));
    };

    if (isLoading) return <Spinner />
    if (error) return <Error errorMessage={error} />

    return (
        <>
            <DoBorrowings
                users={users}
                books={books}
                onBorrow={handleBorrow}
                onReturn={handleReturn} />
        </>
    )
}
