import axios from "axios";

const apiUrl = "http://localhost:8181/borrowings";


export const createBorrowing = async (userId, bookId) => {
    try {
        const response = await axios.post(apiUrl, { userId, bookId });
        const { user, book, borrowing } = response.data;
        return { user, book, borrowing };
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
};


export const returnBook = async (userId, bookId) => {
    try {
        const response = await axios.patch(apiUrl, { userId, bookId });
        const { user, book, borrowing } = response.data;
        return { user, book, borrowing };
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
};


export const userBorrowings = async (id) => {
    try {
        const response = await axios.get(apiUrl + "/user/" + id);
        const data = response.data;
        return data;
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
};

export const getBorrowings = async () => {
    try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        return data;
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
};


export const lateBorrowings = async () => {
    try {
        const response = await axios.get(apiUrl + "/late");
        const data = response.data;
        return data;
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
};

export const openBorrowings = async () => {
    try {
        const response = await axios.get(apiUrl + "/open");
        const data = response.data;
        return data;
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
};


export const lastUserBorrowings = async (id) => {
    try {
        const response = await axios.get(apiUrl + "/last/" + id);
        const data = response.data;
        return data;
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
};

