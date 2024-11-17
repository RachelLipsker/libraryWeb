import { useCallback, useState } from "react";
import { useCurrentUser } from "../providers/UserProvider";
import {
    getUser,
    removeToken,
    setTokenInLocalStorage,
} from "../services/localStorageService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routerModel";
import useAxios from "../../hooks/useAxios";
import { useSnack } from "../../providers/snackBarProvider";
import { login, signup } from "../services/userApiService";

export default function useUsers() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [profile, setProfile] = useState();
    const { setUser, setToken } = useCurrentUser();
    const navigate = useNavigate();
    const setSnack = useSnack();

    useAxios();

    const handleLogin = useCallback(async (userLogin) => {
        try {
            const token = await login(userLogin);
            setTokenInLocalStorage(token);
            setToken(token);
            setUser(getUser());
            setSnack("success", "התחברת בהצלחה");
            navigate(ROUTES.ROOT);
        } catch (err) {
            console.log(err);
            setError(err.message);
            setSnack("error", err.message);
        }
        setIsLoading(false);
    }, []);

    const handleLogout = useCallback(() => {
        removeToken();
        setUser(null);
    }, [])

    const handleSignup = useCallback(async (user) => {
        try {
            const response = await signup(user);
            setSnack("success", "נרשמת בהצלחה");
            await handleLogin({ email: user.email, password: user.password });
        } catch (err) {
            setError(err.message);
            setSnack("error", err.message);
        }
        setIsLoading(false);
    }, [])

    // const getUserById = useCallback(async (id) => {
    //     try {
    //         const userProfile = await getUserProfile(id);
    //         setProfile(userProfile);
    //     } catch (err) {
    //         setError(err.message);
    //         setSnack("error", err.message);
    //     }
    //     setIsLoading(false);
    // }, [])


    // const handleUpdateUser = useCallback(
    //     async (userId, userFromClient) => {
    //         setIsLoading(true);
    //         try {
    //             const userProfile = await editUser(userId, normalizeUpdateUser(userFromClient));
    //             setProfile(userProfile);
    //             setSnack("success", "The profile has been successfully updated");
    //             setTimeout(() => {
    //                 navigate(ROUTES.USER_PROFILE);
    //             }, 300);
    //         } catch (err) {
    //             setError(err.message);
    //             setSnack("error", err.message);
    //         }
    //         setIsLoading(false);
    //     },
    //     [setSnack, navigate]
    // );

    return {
        isLoading,
        error,
        // profile,
        handleLogin,
        handleLogout,
        handleSignup,
        // getUserById,
        // handleUpdateUser
    };
}
