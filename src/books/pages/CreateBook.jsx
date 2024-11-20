import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import { useCurrentUser } from '../../users/providers/UserProvider';
import { Navigate } from 'react-router-dom';
import ROUTES from '../../routes/routerModel';
import useForm from '../../forms/hooks/useForm';
import useBooks from '../hooks/useBooks';
import initialBookForm from '../helpers/initialBookForm';
import bookSchema from '../models/bookSchema';
import BookForm from '../components/BookForm';
import useAuthors from '../../authors/hooks/useAuthors';
import useGenres from '../../genres/hooks/useGenres';

export default function createBook() {
    const { handleAddBook } = useBooks();
    const {
        data,
        errors,
        handleChange,
        handleReset,
        validateForm,
        onSubmit,
        handleChangeSelect
    } = useForm(initialBookForm, bookSchema, handleAddBook);

    const { user } = useCurrentUser();
    const { authors, getAllAuthors } = useAuthors();
    const { genres, getAllGenres } = useGenres();


    useEffect(() => {
        getAllAuthors();
        getAllGenres();
    }, [authors, genres]);


    if (!user?.isAdmin) return <Navigate to={ROUTES.ROOT} replace />;

    return (<Container
        sx={{
            paddingTop: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <BookForm
            onSubmit={onSubmit}
            onReset={handleReset}
            validateForm={validateForm}
            title={"הוספת ספר"}
            errors={errors}
            data={data}
            onInputChange={handleChange}
            authors={authors}
            genres={genres}
            handleChangeSelect={handleChangeSelect}
        />
    </Container>)
}
