import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import useForm from '../../forms/hooks/useForm';
import { Container } from '@mui/material';
import { useCurrentUser } from '../../users/providers/UserProvider';
import ROUTES from '../../routes/routerModel';
import useBooks from '../hooks/useBooks';
import initialEditBookForm from '../helpers/initialEditBookForm';
import editBookSchema from '../models/editBookSchema';
import EditBookForm from '../components/EditBookForm';
import useAuthors from '../../authors/hooks/useAuthors';
import useGenres from '../../genres/hooks/useGenres';
import normalizeBookFreomDb from '../helpers/normalizeBookFromDb';

export default function EditBookPage() {
    const { id } = useParams();
    const { user } = useCurrentUser();
    const { handleUpdateBook, getBookById, book } = useBooks();
    const { authors, getAllAuthors } = useAuthors();
    const { genres, getAllGenres } = useGenres();

    useEffect(() => {
        getAllAuthors();
        getAllGenres();
    }, []);

    const {
        data,
        errors,
        setData,
        handleChange,
        handleReset,
        validateForm,
        onSubmit,
        handleChangeSelect
    } = useForm(initialEditBookForm, editBookSchema, (data) =>
        handleUpdateBook(id, data)
    );
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (book) {
            setData(normalizeBookFreomDb(book));
            setTitle(book.title)
        }
        else {
            getBookById(id);
        }
    }, [book, id]);

    console.log(data);


    if (!user?.isAdmin) return <Navigate to={ROUTES.ROOT} replace />
    return (
        <>
            <Container
                sx={{
                    paddingTop: 8,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <EditBookForm
                    title={" עריכת הספר " + title}
                    onSubmit={onSubmit}
                    onReset={handleReset}
                    errors={errors}
                    validateForm={validateForm}
                    onInputChange={handleChange}
                    data={data}
                    authors={authors}
                    genres={genres}
                    handleChangeSelect={handleChangeSelect}
                />
            </Container>
        </>)
}
