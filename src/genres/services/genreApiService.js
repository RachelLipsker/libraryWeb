import axios from "axios";

const apiUrl = "http://localhost:8181/genres";

export const getGenres = async () => {
    try {
        let response = await axios.get(apiUrl);
        const data = response.data;
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}

export const deletegenre = async (id) => {
    try {
        let response = await axios.delete(apiUrl + "/" + id);
        const data = response.data
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}

export const createGenre = async (name) => {
    try {
        let response = await axios.post(apiUrl, { name });
        const data = response.data
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}

export const updateGenre = async (id, name) => {
    try {
        let response = await axios.put(apiUrl + "/" + id, { name });
        const data = response.data
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}
