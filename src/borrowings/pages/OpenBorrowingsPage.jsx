import React, { useEffect } from 'react'
import useBorrowings from '../hooks/useBorrowings';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import Borrowings from '../components/Borrowings';
import { useCurrentUser } from '../../users/providers/UserProvider';
import { Navigate } from 'react-router-dom';
import ROUTES from '../../routes/routerModel';
import PageHeader from '../../components/PageHeader';

export default function OpenBorrowingsPage() {
    const { borrowings, getOpenBorrowings, isLoading, error } = useBorrowings();
    const { user } = useCurrentUser();
    useEffect(() => {
        getOpenBorrowings();
    }, [])
    const reverseBorrowings = [...borrowings].reverse();


    if (isLoading) return <Spinner />
    if (error) return <Error errorMessage={error} />
    if (!user?.isAdmin) return <Navigate to={ROUTES.ROOT} replace />

    return (
        <>
            <PageHeader title="השאלות פתוחות" />
            <Borrowings borrowings={reverseBorrowings} />
        </>)
}
