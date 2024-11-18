import React from "react";
import Spinner from "../../components/Spinner";
import { Typography } from "@mui/material";
import Books from "./Books";
import Error from "../../components/Error";

export default function BooksFeedback({ isLoading, books, error, handleLike, handleOrder, profile, handleDeleteBook }) {
    if (isLoading) return <Spinner />;
    if (error) return <Error errorMessage={error} />;
    if (books && books.length === 0)
        return (
            <Typography m={2}>
                אופס... אין ספרים להצגה            </Typography>
        );

    if (books)
        return (
            <Books
                books={books}
                handleLike={handleLike}
                handleOrder={handleOrder}
                profile={profile}
                handleDeleteBook={handleDeleteBook}
            />
        );

    return null;
}
