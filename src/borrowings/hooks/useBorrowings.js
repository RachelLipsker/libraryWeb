import { useNavigate } from "react-router-dom";
import { useSnack } from "../../providers/snackBarProvider";
import useAxios from "../../hooks/useAxios";
import { useCallback, useState } from "react";
import { createBorrowing, getBorrowings, lastUserBorrowings, lateBorrowings, openBorrowings, returnBook, userBorrowings } from "../services/borrowingsApiService";

export default function useBorrowings() {

    const [error, setError] = useState();
    const [borrowings, setBorrowings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const setSnack = useSnack();
    useAxios();

    const onBorrow = useCallback(
        async (userId, bookId) => {
            try {
                const { user, book, borrowing } = await createBorrowing(userId, bookId);
                setBorrowings(borrowings => [borrowing, ...borrowings]);
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
                setBorrowings(borrowings => {
                    // בדיקה אם ההשאלה קיימת במערך לפי ה-_id
                    const existingIndex = borrowings.findIndex(borrow => borrow._id === borrowing._id);
                    if (existingIndex !== -1) {
                        // אם ההשאלה קיימת, מעדכנים אותה
                        return borrowings.map((borrow, index) =>
                            index === existingIndex ? borrowing : borrow
                        );
                    } else {
                        // אם ההשאלה לא קיימת, מוסיפים אותה לסוף המערך
                        return [borrowing, ...borrowings];
                    }
                });

                setSnack("success", "ההחזרה בוצעה בהצלחה")
                return { user, book, borrowing }
            } catch (err) {
                setSnack("error", err.message);
            }
            setIsLoading(false);
        },
        []
    );

    const getAllBorrowings = useCallback(
        async () => {
            try {
                const borrowings = await getBorrowings();
                setBorrowings(borrowings);
            } catch (err) {
                setSnack("error", err.message);
            }
            setIsLoading(false);
        }, []
    );

    const getUserBorrowings = useCallback(
        async (id) => {
            try {
                const borrowings = await userBorrowings(id);
                setBorrowings(borrowings);
            } catch (err) {
                setSnack("error", err.message);
            }
            setIsLoading(false);
        }, []
    );

    const getLateBorrowings = useCallback(
        async () => {
            try {
                const borrowings = await lateBorrowings();
                setBorrowings(borrowings);
            } catch (err) {
                setSnack("error", err.message);
            }
            setIsLoading(false);
        }, []
    );

    const getOpenBorrowings = useCallback(
        async () => {
            try {
                const borrowings = await openBorrowings();
                setBorrowings(borrowings);
            } catch (err) {
                setSnack("error", err.message);
            }
            setIsLoading(false);
        }, []
    );

    const getLastUserBorrowings = useCallback(
        async (id) => {
            try {
                const borrowings = await lastUserBorrowings(id);
                setBorrowings(borrowings);
            } catch (err) {
                setSnack("error", err.message);
            }
            setIsLoading(false);
        }, []
    );

    return {
        isLoading,
        error,
        onBorrow,
        onReturn,
        borrowings,
        getAllBorrowings,
        getUserBorrowings,
        getLateBorrowings,
        getOpenBorrowings,
        getLastUserBorrowings,
    };
}
