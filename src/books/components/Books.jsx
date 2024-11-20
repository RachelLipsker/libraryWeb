import React, { useState } from 'react';
import { Container } from '@mui/material';
import BookComponent from './BookComponent';
import { useCurrentUser } from '../../users/providers/UserProvider';

export default function Books({ books, handleLike, handleOrder, profile, handleDeleteBook }) {
    const { user } = useCurrentUser();
    const [booksToOrder, setBooksToOrder] = useState(profile?.booksToOrder || 0);

    const [userOrdersLength, setUserOrdersLength] = useState(profile?.orders?.length || 0)

    const [ableToOrder, setAbleToOrder] = useState(() => {
        if (!user || userOrdersLength >= booksToOrder) {
            return false;
        } else {
            return true;
        }
    });

    return (
        <>
            <Container sx={{ display: "flex", flexDirection: "row-reverse", justifyContent: "space-evenly", flexWrap: "wrap" }}>
                {books.map((book) => <BookComponent
                    key={book._id}
                    book={book}
                    handleLike={handleLike}
                    handleOrder={handleOrder}
                    profile={profile}
                    booksToOrder={booksToOrder}
                    userOrdersLength={userOrdersLength}
                    ableToOrder={ableToOrder}
                    setUserOrdersLength={setUserOrdersLength}
                    setAbleToOrder={setAbleToOrder}
                    handleDeleteBook={handleDeleteBook}
                />)}
            </Container>
        </>
    )
}
