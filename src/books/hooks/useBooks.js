import { useCallback, useState } from "react";
import { getBooks } from "../services/booksApiService";




export default function useBooks() {
    const [books, setBooks] = useState(null);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);


    const getAllBooks = useCallback(async () => {
        try {
            const data = await getBooks();
            setBooks(data);
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, []);


    return {
        getAllBooks,
        books,
        isLoading,
        error
    };
}
