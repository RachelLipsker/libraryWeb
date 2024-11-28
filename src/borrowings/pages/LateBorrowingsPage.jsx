import React, { useEffect } from 'react'
import useBorrowings from '../hooks/useBorrowings';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import Borrowings from '../components/Borrowings';
import ROUTES from '../../routes/routerModel';
import { useCurrentUser } from '../../users/providers/UserProvider';

export default function LateBorrowingsPage() {
    const { borrowings, getLateBorrowings, isLoading, error } = useBorrowings();
    const { user } = useCurrentUser();
    useEffect(() => {
        getLateBorrowings();
    }, [])


    if (isLoading) return <Spinner />
    if (error) return <Error errorMessage={error} />
    if (!user?.isAdmin) return <Navigator to={ROUTES.ROOT} replace />

    return (
        <>
            <Borrowings borrowings={borrowings} />
        </>)
}
