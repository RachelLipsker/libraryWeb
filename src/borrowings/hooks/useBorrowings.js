import { useNavigate } from "react-router-dom";
import { useSnack } from "../../providers/snackBarProvider";
import useAxios from "../../hooks/useAxios";
import { useCallback, useState } from "react";
import { createBorrowing, returnBook } from "../services/borrowingsApiService";

export default function useBorrowings() {

    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const setSnack = useSnack();
    useAxios();

    const onBorrow = useCallback(
        async (userId, bookId) => {
            try {
                const { user, book, borrowing } = await createBorrowing(userId, bookId);
                // setBorrowings(authors => authors.map(author => author._id == newAuthor._id ? newAuthor : author));
                setSnack("success", "ההשאלה בוצעה בהצלחה")
                return { user, book, borrowing };
            } catch (err) {
                setSnack("error", err.message);
            }
            setIsLoading(false);
        },
        []
    );

    const onReturn = useCallback(
        async (userId, bookId) => {
            try {
                const { user, book, borrowing } = await returnBook(userId, bookId);
                // setBorrowings(authors => authors.map(author => author._id == newAuthor._id ? newAuthor : author));
                setSnack("success", "ההחזרה בוצעה בהצלחה")
                return { user, book, borrowing }
            } catch (err) {
                setSnack("error", err.message);
            }
            setIsLoading(false);
        },
        []
    );

    // const getAllBorrowings = useCallback(
    //     async () => {
    //         try {
    //             const { user, book, borrowing } = await returnBook(userId, bookId);
    //             // setBorrowings(authors => authors.map(author => author._id == newAuthor._id ? newAuthor : author));
    //             setSnack("success", "ההחזרה בוצעה בהצלחה")
    //             return { user, book, borrowing }
    //         } catch (err) {
    //             setSnack("error", err.message);
    //         }
    //         setIsLoading(false);
    //     },
    //     []
    // );



    return {
        isLoading,
        error,
        onBorrow,
        onReturn,
    };
}
