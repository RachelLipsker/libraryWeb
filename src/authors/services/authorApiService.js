import axios from "axios";

const apiUrl = "http://localhost:8181/authors";

export const getAuthors = async () => {
    try {
        let response = await axios.get(apiUrl);
        const data = response.data;
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}

export const deleteauthor = async (id) => {
    try {
        let response = await axios.delete(apiUrl + "/" + id);
        const data = response.data
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}

export const createAuthor = async (name) => {
    try {
        let response = await axios.post(apiUrl, { name });
        const data = response.data
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}

export const updateAuthor = async (id, name) => {
    try {
        let response = await axios.put(apiUrl + "/" + id, { name });
        const data = response.data
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}