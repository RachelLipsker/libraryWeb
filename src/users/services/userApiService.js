import axios from "axios";

const apiUrl = "http://localhost:8181/user";

export const login = async (userLogin) => {
    try {
        const response = await axios.post(apiUrl + "/login", userLogin);
        const data = response.data;
        return data;
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    }
};

export const signup = async (user) => {
    try {
        const { data } = await axios.post(apiUrl, user);
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// export const getUserProfile = async (id) => {
//     try {
//         const response = await axios.get(apiUrl + "/" + id);
//         const data = response.data;
//         return data;
//     } catch (err) {
//         console.log(err);
//         throw new Error(err.message);
//     }
// };

// export const editUser = async (id, user) => {
//     try {
//         let response = await axios.put(apiUrl + "/" + id, user);
//         const data = response.data
//         return data;
//     } catch (err) {
//         console.log(err);
//         throw new Error(err.message)
//     }
// }