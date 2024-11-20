import { useNavigate } from "react-router-dom";
import { useSnack } from "../../providers/snackBarProvider";
import { createGenre, deletegenre, getGenres, updateGenre } from "../services/genreApiService";
import useAxios from "../../hooks/useAxios";
import { useCallback, useState } from "react";

export default function useGenres() {

    const [genres, setGenres] = useState(null);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const setSnack = useSnack();
    useAxios();

    const getAllGenres = useCallback(async () => {
        try {
            const data = await getGenres();
            setGenres(data);
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, []);

    const deleteGenre = useCallback(async (id) => {
        try {
            const deletedGenre = await deletegenre(id);
            setGenres(genres => genres.filter(genre => genre._id !== deletedGenre._id));
        } catch (e) {
            setSnack("error", e.message);
        }
    }, []);

    const addGenre = useCallback(async (genre) => {
        try {
            const newGenre = await createGenre(genre);
            setGenres(genres => [...genres, newGenre]);
        } catch (err) {
            setSnack("error", err.message);
        }
        setIsLoading(false);
    }, []);

    const editGenre = useCallback(
        async (genreId, genreNew) => {
            try {
                const newGenre = await updateGenre(genreId, genreNew);
                setGenres(genres => genres.map(genre => genre._id == newGenre._id ? newGenre : genre));
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
        genres,
        getAllGenres,
        addGenre,
        editGenre,
        deleteGenre
    };
}
