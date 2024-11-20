import { useCallback, useState } from "react";
import { changeLikeStatus, changeOrderStatus, createBook, deleteBook, getBooks, resetOrders } from "../services/booksApiService";
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
            setSnack("error", err.message);
        }
    }, []);

    const handleOrder = useCallback(async (id, user) => {
        try {
            if (user) {
                await changeOrderStatus(id);
            } else {
                navigate(ROUTES.LOGIN);
            }
        } catch (err) {
            setSnack("error", err.message);
        }
    }, []);

    const handleDeleteBook = useCallback(async (id) => {
        try {
            const deldetedBook = await deleteBook(id);
            setSnack("success", "הספר נמחק");
            setBooks(books => books.filter(book => book._id !== deldetedBook._id));
        } catch (e) {
            setSnack("error", err.message);
        }
    }, []);

    const handleAddBook = useCallback(async (newBook) => {
        try {
            const data = await createBook(newBook);
            setSnack("success", "הספר נוצר בהצלחה");
            navigate(ROUTES.ROOT);
        } catch (err) {
            setSnack("error", err.message);
        }
        setIsLoading(false);
    }, [])

    const handleResetOrders = useCallback(async (newBook) => {
        try {
            if (confirm("האם אתה בטוח שברצונך לאפס את כל ההזמנות?")) {
                const data = await resetOrders(newBook);
                setSnack("success", "כל ההזמנות אופסו בהצלחה");
                setBooks(books => [...books])
            }
        } catch (err) {
            setSnack("error", err.message);
        }
        setIsLoading(false);
    }, [])


    return {
        getAllBooks,
        books,
        isLoading,
        error,
        handleLike,
        handleOrder,
        handleDeleteBook,
        handleAddBook,
        handleResetOrders
    };
}
