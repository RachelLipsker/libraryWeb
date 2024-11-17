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