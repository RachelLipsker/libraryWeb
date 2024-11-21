import axios from "axios";

const apiUrl = "http://localhost:8181/borrowings";


export const createBorrowing = async (userId, bookId) => {
    try {
        const response = await axios.post(apiUrl, { userId, bookId });
        const data = response.data;
        return data;
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
};


export const returnBook = async (userId, bookId) => {
    try {
        const response = await axios.patch(apiUrl, { userId, bookId });
        const data = response.data;
        return data;
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
};

