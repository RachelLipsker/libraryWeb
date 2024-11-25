import React, { useEffect } from 'react'
import useBorrowings from '../hooks/useBorrowings';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import Borrowings from '../components/Borrowings';

export default function OpenBorrowingsPage() {
    const { borrowings, getOpenBorrowings, isLoading, error } = useBorrowings();
    useEffect(() => {
        getOpenBorrowings();
    }, [])
    const reverseBorrowings = [...borrowings].reverse();

    if (isLoading) return <Spinner />
    if (error) return <Error errorMessage={error} />
    return (
        <>
            <Borrowings borrowings={reverseBorrowings} />
        </>)
}
