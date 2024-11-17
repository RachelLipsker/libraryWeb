import { useCallback, useState } from "react";
import { changeLikeStatus, getBooks } from "../services/booksApiService";
import useAxios from "../../hooks/useAxios";
import ROUTES from "../../routes/routerModel";
import { useSnack } from "../../providers/snackBarProvider";
import { useNavigate } from "react-router-dom";


export default function useBooks() {

    const [books, setBooks] = useState(null);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const setSnack = useSnack();
    useAxios();


    const getAllBooks = useCallback(async () => {
        try {
            const data = await getBooks();
            setBooks(data);
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, []);


    const handleLike = useCallback(async (id, user) => {
        try {
            if (user) {
                await changeLikeStatus(id);
            } else {
                navigate(ROUTES.LOGIN);
            }
        } catch (err) {
            setError(err.message);
            setSnack("error", err.message);
        }
    }, []);


    return {
        getAllBooks,
        books,
        isLoading,
        error,
        handleLike
    };
}
