import React, { useEffect } from 'react'
import useUsers from '../../users/hooks/useUsers'
import useBooks from '../../books/hooks/useBooks';
import useBorrowings from '../hooks/useBorrowings';
import DoBorrowings from '../components/DoBorrowings';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';

export default function BorrowingsPage() {
    const { users, getAllUsers, isLoading, error } = useUsers();
    const { books, getAllBooks } = useBooks();
    const { onBorrow, onReturn } = useBorrowings();

    useEffect(() => {
        getAllBooks(),
            getAllUsers()
    }, [])

    if (isLoading) return <Spinner />
    if (error) return <Error errorMessage={error} />

    return (
        <>
            <DoBorrowings
                users={users}
                books={books}
                onBorrow={onBorrow}
                onReturn={onReturn} />
        </>
    )
}
