import React, { useEffect } from 'react'
import useBorrowings from '../hooks/useBorrowings'
import Borrowings from '../components/Borrowings';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import { useCurrentUser } from '../../users/providers/UserProvider';
import { Navigate } from 'react-router-dom';
import ROUTES from '../../routes/routerModel';

export default function BorrowingHistoryPage() {
    const { borrowings, getAllBorrowings, isLoading, error } = useBorrowings();
    const { user } = useCurrentUser();
    useEffect(() => {
        getAllBorrowings();
    }, [])
    const reverseBorrowings = [...borrowings].reverse();

    if (isLoading) return <Spinner />
    if (error) return <Error errorMessage={error} />

    if (!user?.isAdmin) return <Navigate to={ROUTES.ROOT} replace />
    return (
        <>
            <Borrowings borrowings={reverseBorrowings} />
        </>)
}
