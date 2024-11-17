import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ROUTES from './routerModel'
import BooksPage from '../books/pages/BooksPage'
import LoginPage from '../users/pages/LoginPage'
import SignUpPage from '../users/pages/SignupPage'

export default function Router() {
    return (
        <Routes>
            <Route path={ROUTES.ROOT} element={<BooksPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />

        </Routes>
    )
}
