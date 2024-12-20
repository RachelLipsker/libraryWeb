import axios from "axios";

const apiUrl = "http://localhost:8181/books";

export const getBooks = async () => {
    try {
        let response = await axios.get(apiUrl);
        const data = response.data;
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}

export const changeLikeStatus = async (id) => {
    try {
        let response = await axios.patch(apiUrl + "/like/" + id);
        const data = response.data
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}

export const changeOrderStatus = async (id) => {
    try {
        let response = await axios.patch(apiUrl + "/order/" + id);
        const data = response.data
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}

export const deleteBook = async (id) => {
    try {
        let response = await axios.delete(apiUrl + "/" + id);
        const data = response.data
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}

export const createBook = async (newBook) => {
    try {
        let response = await axios.post(apiUrl, newBook);
        const data = response.data
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}


export const resetOrders = async () => {
    try {
        let response = await axios.patch(apiUrl + "/orders");
        const data = response.data
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}


export const editBook = async (bookId, newBook) => {
    try {
        let response = await axios.put(apiUrl + "/" + bookId, newBook);
        const data = response.data
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}

export const getBook = async (bookId) => {
    try {
        let response = await axios.get(apiUrl + "/" + bookId);
        const data = response.data;
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}
