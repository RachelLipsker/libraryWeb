import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ROUTES from './routerModel'
import BooksPage from '../books/pages/BooksPage'

export default function Router() {
    return (
        <Routes>
            <Route path={ROUTES.ROOT} element={<BooksPage />} />
        </Routes>
    )
}
