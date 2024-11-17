import React, { useEffect } from 'react'
import useBooks from '../hooks/useBooks';
import BooksFeedback from '../components/BooksFeedback';

export default function BooksPage() {
    const { books, getAllBooks, isLoading, error, handleLike } =
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
                handleLike={handleLike}
            />
        </>
    )
}
