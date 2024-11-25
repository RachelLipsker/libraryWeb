import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ROUTES from './routerModel'
import BooksPage from '../books/pages/BooksPage'
import LoginPage from '../users/pages/LoginPage'
import SignUpPage from '../users/pages/SignupPage'
import ProfilePage from '../users/pages/ProfilePage'
import CreateBook from '../books/pages/CreateBook'
import ErrorPage from '../pages/ErrorPage'
import EditBookPage from '../books/pages/EditBookPage'
import UsersPage from '../users/pages/UsersPage'
import BorrowingsPage from '../borrowings/pages/BorrowingsPage'
import BorrowingHistoryPage from '../borrowings/pages/BorrowingHistoryPage'
import BorrowingUserHistoryPage from '../borrowings/pages/BorrowingUserHistoryPage'
import OpenBorrowingsPage from '../borrowings/pages/OpenBorrowingsPage'
import LateBorrowingsPage from '../borrowings/pages/LateBorrowingsPage'
import EditProfilePage from '../users/pages/EditProfilePage'

export default function Router() {
    return (
        <Routes>
            <Route path={ROUTES.ROOT} element={<BooksPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
            <Route path={ROUTES.USER_PROFILE + "/:id"} element={<ProfilePage />} />
            <Route path={ROUTES.CREATE_BOOK} element={<CreateBook />} />
            <Route path={ROUTES.EDIT_BOOK + "/:id"} element={<EditBookPage />} />
            <Route path={ROUTES.USERS} element={<UsersPage />} />
            <Route path={ROUTES.BORROWINGS_MANAGEMENT} element={<BorrowingsPage />} />
            <Route path={ROUTES.BORROWINGS_HISTORY} element={<BorrowingHistoryPage />} />
            <Route path={ROUTES.USER_HISTORY + "/:id"} element={<BorrowingUserHistoryPage />} />
            <Route path={ROUTES.OPEN_BORROWINGS} element={<OpenBorrowingsPage />} />
            <Route path={ROUTES.LATE_BORROWINGS} element={<LateBorrowingsPage />} />
            <Route path={ROUTES.EDIT_PROFILE + "/:id"} element={<EditProfilePage />} />


            <Route path='*' element={<ErrorPage />} />

        </Routes>
    )
}
