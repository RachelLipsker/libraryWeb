import React, { useEffect } from 'react'
import useUsers from '../hooks/useUsers'
import AllUsers from './AllUsers';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import { useCurrentUser } from '../providers/UserProvider';
import { Navigate } from 'react-router-dom';
import ROUTES from '../../routes/routerModel';

export default function UsersPage() {
    const { user } = useCurrentUser();
    const { users, getAllUsers, isLoading, error, onUpdateBooksToBorrowing,
        onUpdateBooksToOrder,
        onToggleUserRole,
        onDeleteUser } = useUsers();

    useEffect(() => {
        getAllUsers();
    }, [])

    // if (!user?.isAdmin) return <Navigate to={ROUTES.ROOT} replace />;
    if (isLoading) return <Spinner />
    if (error) return <Error errorMessage={error} />
    return (
        <>
            <AllUsers users={users}
                onUpdateBooksToBorrowing={onUpdateBooksToBorrowing}
                onUpdateBooksToOrder={onUpdateBooksToOrder}
                onToggleUserRole={onToggleUserRole}
                onDeleteUser={onDeleteUser}
                currentUser={user} />
        </>
    )
}