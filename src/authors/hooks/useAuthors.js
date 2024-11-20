import { useNavigate } from "react-router-dom";
import { useSnack } from "../../providers/snackBarProvider";
import { createAuthor, deleteauthor, getAuthors, updateAuthor } from "../services/authorApiService";
import useAxios from "../../hooks/useAxios";
import { useCallback, useState } from "react";

export default function useAuthors() {

    const [authors, setAuthors] = useState(null);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const setSnack = useSnack();
    useAxios();


    const getAllAuthors = useCallback(async () => {
        try {
            const data = await getAuthors();
            setAuthors(data);
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, []);

    const deleteAuthor = useCallback(async (id) => {
        try {
            const deldetedAuthor = await deleteauthor(id);
            // setSnack("success", "הסופר נמחק");
            setAuthors(authors => authors.filter(author => author._id !== deldetedAuthor._id));
        } catch (e) {
            // console.log(e);
            setSnack("error", e.message);
        }
    }, []);


    const addAuthor = useCallback(async (author) => {
        try {
            const newAuthor = await createAuthor(author);
            setAuthors(authors => [...authors, newAuthor]);
        } catch (err) {
            setSnack("error", err.message);
        }
        setIsLoading(false);
    }, [])


    const editAuthor = useCallback(
        async (authorId, authorNew) => {
            try {
                const newAuthor = await updateAuthor(authorId, authorNew);
                setAuthors(authors => authors.map(author => author._id == newAuthor._id ? newAuthor : author));
            } catch (err) {
                setError(err.message);
                setSnack("error", err.message);
            }
            setIsLoading(false);
        },
        []
    );




    return {
        isLoading,
        error,
        authors,
        getAllAuthors,
        addAuthor,
        editAuthor,
        deleteAuthor
    };
}
