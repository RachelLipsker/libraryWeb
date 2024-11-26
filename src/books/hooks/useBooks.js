import { useCallback, useEffect, useState } from "react";
import {
    changeLikeStatus,
    changeOrderStatus,
    createBook,
    deleteBook,
    editBook,
    getBook,
    getBooks,
    resetOrders,
} from "../services/booksApiService";
import useAxios from "../../hooks/useAxios";
import ROUTES from "../../routes/routerModel";
import { useSnack } from "../../providers/snackBarProvider";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function useBooks() {
    const [books, setBooks] = useState();
    const [book, setBook] = useState(null);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState(""); // לחיפוש
    const [filterBooks, setFilterBooks] = useState(null); // תוצאות אחרי חיפוש
    const [secondFilterBooks, setSecondFilterBooks] = useState(null); // תוצאות אחרי סינון
    const [filters, setFilters] = useState({ authors: [], genres: [], inLibrary: false }); // סטייט של הסינון
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const setSnack = useSnack();
    useAxios();

    // חיפוש
    useEffect(() => {
        setQuery(searchParams.get("q") ?? "");
    }, [searchParams]);

    useEffect(() => {
        if (books) {
            setFilterBooks(
                books.filter((book) =>
                    book.title.includes(query)
                )
            );
            setIsLoading(false);
        }
    }, [books, query]);

    // סינון
    useEffect(() => {
        if (filterBooks) {
            const { authors, genres, inLibrary } = filters;
            setSecondFilterBooks(
                filterBooks.filter((book) => {
                    const authorMatch = authors.length
                        ? authors.includes(book.author._id)
                        : true;
                    const genreMatch = genres.length
                        ? genres.includes(book.genre._id)
                        : true;
                    const inLibraryMatch = inLibrary ? book.inLibrary : true;

                    return authorMatch && genreMatch && inLibraryMatch;
                })
            );
        }
    }, [filterBooks, filters]);

    const handleFilterChange = useCallback((newFilters) => {
        setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
    }, []);

    const getAllBooks = useCallback(async () => {
        try {
            const data = await getBooks();
            setBooks(data);
        } catch (err) {
            setError(err.message);
        }
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
            const deletedBook = await deleteBook(id);
            setSnack("success", "הספר נמחק");
            setBooks((books) => books.filter((book) => book._id !== deletedBook._id));
        } catch (e) {
            setSnack("error", e.message);
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
    }, []);

    const handleResetOrders = useCallback(async (newBook) => {
        try {
            if (confirm("האם אתה בטוח שברצונך לאפס את כל ההזמנות?")) {
                const data = await resetOrders(newBook);
                setSnack("success", "כל ההזמנות אופסו בהצלחה");
                setBooks((books) => [...books]);
            }
        } catch (err) {
            setSnack("error", err.message);
        }
        setIsLoading(false);
    }, []);

    const handleUpdateBook = useCallback(
        async (bookId, newBook) => {
            try {
                const upBook = await editBook(bookId, newBook);
                setBook(upBook);
                setSnack("success", "הספר נערך בהצלחה");
                setTimeout(() => {
                    navigate(ROUTES.ROOT);
                }, 300);
            } catch (err) {
                setSnack("error", err.message);
            }
            setIsLoading(false);
        },
        [setSnack, navigate]
    );

    const getBookById = useCallback(async (id) => {
        try {
            const oneBook = await getBook(id);
            setBook(oneBook);
        } catch (err) {
            setSnack("error", err.message);
        }
        setIsLoading(false);
    }, []);

    return {
        getAllBooks,
        books,
        isLoading,
        error,
        handleLike,
        handleOrder,
        handleDeleteBook,
        handleAddBook,
        handleResetOrders,
        handleUpdateBook,
        getBookById,
        book,
        setBooks,
        filterBooks,
        secondFilterBooks,
        handleFilterChange,
    };
}
