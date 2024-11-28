import React, { useEffect } from 'react'
import useUsers from '../hooks/useUsers'
import AllUsers from '../components/AllUsers';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import { useCurrentUser } from '../providers/UserProvider';
import { Navigate } from 'react-router-dom';
import ROUTES from '../../routes/routerModel';
import PageHeader from '../../components/PageHeader';

export default function UsersPage() {
    const { user } = useCurrentUser();
    const { users, getAllUsers, isLoading, error, onUpdateBooksToBorrowing,
        onUpdateBooksToOrder,
        onToggleUserRole,
        onDeleteUser } = useUsers();

    useEffect(() => {
        getAllUsers();
    }, [])

    if (isLoading) return <Spinner />

    if (error) return <Error errorMessage={error} />
    if (!user?.isAdmin) return <Navigate to={ROUTES.ROOT} replace />;

    return (
        <>
            <PageHeader title="ניהול משתמשים" />
            <AllUsers users={users}
                onUpdateBooksToBorrowing={onUpdateBooksToBorrowing}
                onUpdateBooksToOrder={onUpdateBooksToOrder}
                onToggleUserRole={onToggleUserRole}
                onDeleteUser={onDeleteUser}
                currentUser={user} />
        </>
    )
}
