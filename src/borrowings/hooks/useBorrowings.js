import { useNavigate } from "react-router-dom";
import { useSnack } from "../../providers/snackBarProvider";
import useAxios from "../../hooks/useAxios";
import { useCallback, useState } from "react";
import { createBorrowing, getBorrowings, returnBook } from "../services/borrowingsApiService";

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
                setBorrowings(borrowings => [...borrowings, borrowing]);
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
                        return [...borrowings, borrowing];
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



    return {
        isLoading,
        error,
        onBorrow,
        onReturn,
        borrowings,
        getAllBorrowings,
    };
}
