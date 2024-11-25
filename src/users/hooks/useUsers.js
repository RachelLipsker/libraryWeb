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
import { getUserProfile, getUsers, login, signup, borrowingNumber, ordersNumber, patchAdmin, deleteUser, editUser } from "../services/userApiService";

export default function useUsers() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [profile, setProfile] = useState();
    const { setUser, setToken } = useCurrentUser();
    const navigate = useNavigate();
    const setSnack = useSnack();
    const [users, setUsers] = useState();

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

    const getUserById = useCallback(async (id) => {
        try {
            const userProfile = await getUserProfile(id);
            setProfile(userProfile);
        } catch (err) {
            setSnack("error", err.message);
        }
        setIsLoading(false);
    }, [])

    const getAllUsers = useCallback(async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, []);

    const onUpdateBooksToBorrowing = useCallback(async (userId, number) => {
        try {
            const upUser = await borrowingNumber(userId, number);
            setUsers(users => users.map(user => userId == user._id ? upUser : user));
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, []);

    const onUpdateBooksToOrder = useCallback(async (userId, number) => {
        try {
            const upUser = await ordersNumber(userId, number);
            setUsers(users => users.map(user => userId == user._id ? upUser : user));
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, []);

    const onToggleUserRole = useCallback(async (userId) => {
        try {
            const upUser = await patchAdmin(userId);
            setUsers(users => users.map(user => userId == user._id ? upUser : user));
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, []);

    const onDeleteUser = useCallback(async (id) => {
        try {
            if (confirm("האם אתה בטוח שברצונך למחוק את המשתמש??")) {
                const deldetedUser = await deleteUser(id);
                setSnack("success", "המשתמש נמחק");
                setUsers(users => users.filter(user => user._id !== deldetedUser._id));
            }
        } catch (e) {
            setSnack("error", e.message);
        }
    }, []);

    const handleUpdateUser = useCallback(
        async (userId, userFromClient) => {
            setIsLoading(true);
            try {
                const userProfile = await editUser(userId, userFromClient);
                setProfile(userProfile);
                setSnack("success", "הפרופיל עודכן בהצלחה");
                setTimeout(() => {
                    navigate(ROUTES.USER_PROFILE + "/" + userId);
                }, 300);
            } catch (err) {
                setError(err.message);
                setSnack("error", err.message);
            }
            setIsLoading(false);
        },
        []
    );

    return {
        isLoading,
        error,
        profile,
        handleLogin,
        handleLogout,
        handleSignup,
        getUserById,
        getAllUsers,
        users,
        onUpdateBooksToBorrowing,
        onUpdateBooksToOrder,
        onToggleUserRole,
        onDeleteUser,
        setUsers,
        handleUpdateUser
    };
}
