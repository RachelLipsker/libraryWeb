import { useState, useCallback } from "react";

export default function useSortBooks() {
    const [sortOption, setSortOption] = useState(""); // אפשרות המיון שנבחרה

    const sortBooks = useCallback(
        (books) => {
            if (!books) return [];

            const sortedBooks = [...books];
            switch (sortOption) {
                case "AtoZ":
                    return sortedBooks.sort((a, b) => a.title.localeCompare(b.title, "he"));
                case "ZtoA":
                    return sortedBooks.sort((a, b) => b.title.localeCompare(a.title, "he"));
                case "newest":
                    return sortedBooks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                case "oldest":
                    return sortedBooks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                default:
                    return books;
            }
        },
        [sortOption]
    );

    return {
        sortOption,
        setSortOption,
        sortBooks,
    };
}
