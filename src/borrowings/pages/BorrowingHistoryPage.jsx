import React, { useEffect } from 'react'
import useBorrowings from '../hooks/useBorrowings'
import Borrowings from '../components/Borrowings';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';

export default function BorrowingHistoryPage() {
    const { borrowings, getAllBorrowings, isLoading, error } = useBorrowings();
    useEffect(() => {
        getAllBorrowings();
    }, [])
    const reverseBorrowings = [...borrowings].reverse();

    if (isLoading) return <Spinner />
    if (error) return <Error errorMessage={error} />
    return (
        <>
            <Borrowings borrowings={reverseBorrowings} />
        </>)
}
