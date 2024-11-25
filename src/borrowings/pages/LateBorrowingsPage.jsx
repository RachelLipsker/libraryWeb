import React from 'react'
import useBorrowings from '../hooks/useBorrowings';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import Borrowings from '../components/Borrowings';

export default function LateBorrowingsPage() {
    const { borrowings, getLateBorrowings, isLoading, error } = useBorrowings();
    useEffect(() => {
        getLateBorrowings();
    }, [])

    if (isLoading) return <Spinner />
    if (error) return <Error errorMessage={error} />
    return (
        <>
            <Borrowings borrowings={borrowings} />
        </>)
}
