import React, { useEffect } from 'react'
import useBooks from '../hooks/useBooks';
import Spinner from '../../components/Spinner';
import Books from '../components/Books';
import BooksFeedback from '../components/BooksFeedback';

export default function BooksPage() {
    const { books, getAllBooks, isLoading, error } =
        useBooks();
    useEffect(() => {
        getAllBooks();
    }, []);
    return (
        <>
            <BooksFeedback
                books={books}
                isLoading={isLoading}
                error={error}
            />
        </>
    )
}
