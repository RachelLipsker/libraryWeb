import React from 'react';
import { Container } from '@mui/material';
import BookComponent from './BookComponent';

export default function Books({ books }) {

    return (
        <>
            <Container sx={{ display: "flex", flexWrap: "wrap", flexDirection: "row-reverse" }}>
                {books.map((book) => <BookComponent
                    key={book._id}
                    book={book}
                />)}
            </Container>
        </>
    )
}
