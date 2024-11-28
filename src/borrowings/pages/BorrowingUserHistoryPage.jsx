import React, { useEffect } from 'react'
import useBorrowings from '../hooks/useBorrowings'
import Borrowings from '../components/Borrowings';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import { Navigate, useParams } from 'react-router-dom';
import { useCurrentUser } from '../../users/providers/UserProvider';
import ROUTES from '../../routes/routerModel';
import PageHeader from '../../components/PageHeader';

export default function BorrowingUserHistoryPage() {
    const { borrowings, getUserBorrowings, isLoading, error } = useBorrowings();
    const { id } = useParams();
    const { user } = useCurrentUser();

    useEffect(() => {
        getUserBorrowings(id);
    }, [id, user])

    const reverseBorrowings = [...borrowings].reverse();


    if (user?._id != id && !user?.isAdmin) return <Navigate to={ROUTES.ROOT} replace />

    if (isLoading) return <Spinner />
    if (error) return <Error errorMessage={error} />
    return (
        <>
            <PageHeader title="היסטוריית השאלות שלי" />
            <Borrowings borrowings={reverseBorrowings} />
        </>)
}
