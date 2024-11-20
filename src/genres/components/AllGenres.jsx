import React, { useEffect, useState } from "react";
import {
    Box,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
} from "@mui/material";
import { Edit, Delete, Save } from "@mui/icons-material";
import useGenres from "../hooks/useGenres";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";

export default function AllGenres({ books }) {
    const { genres, getAllGenres, isLoading, error, addGenre, editGenre, deleteGenre } = useGenres();
    const [newGenreName, setNewGenreName] = useState("");
    const [editingGenreId, setEditingGenreId] = useState(null);
    const [editedGenreName, setEditedGenreName] = useState("");

    useEffect(() => {
        getAllGenres();
    }, []);

    const handleAddGenre = () => {
        addGenre(newGenreName);
        setNewGenreName("");
    };

    const handleEditGenre = (id, name) => {
        setEditingGenreId(id);
        setEditedGenreName(name);
    };

    const handleSaveGenre = (id) => {
        if (editedGenreName.trim()) {
            editGenre(id, editedGenreName);
            setEditingGenreId(null);
            setEditedGenreName("");
        }
    };

    if (isLoading) return <Spinner />;
    if (error) return <Error errorMessage={error} />;

    return (
        <Box
            sx={{
                // width: "20%",
                p: 1,
                border: "1px solid #ccc",
                borderRadius: 2,
            }}
        >
            {/* Add Genre Section */}
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    mb: 1,
                    alignItems: "center",
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddGenre}
                    sx={{
                        whiteSpace: "nowrap",
                        height: "54px",
                        backgroundColor: "#5066C1",
                    }}
                >
                    הוסף
                </Button>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="ז'אנר"
                    value={newGenreName}
                    onChange={(e) => setNewGenreName(e.target.value)}
                    InputProps={{
                        notched: false,
                        sx: { "& input": { textAlign: "right" } },
                    }}
                />
            </Box>

            {/* Genres List */}
            <List>
                {genres.map((genre) => (
                    <ListItem
                        key={genre._id}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            border: "1px solid #ccc",
                            borderRadius: 1,
                            mb: 1,
                            padding: "8px 16px",
                        }}
                    >

                        <Box>
                            {editingGenreId === genre._id ? (
                                <IconButton onClick={() => handleSaveGenre(genre._id)} >
                                    <Save />
                                </IconButton>
                            ) : (
                                <IconButton onClick={() => handleEditGenre(genre._id, genre.name)} >
                                    <Edit />
                                </IconButton>
                            )}

                            {/* Hide Delete button when in edit mode */}
                            {(!!books?.map(book => book.genre._id).find(id => id == genre._id) || editingGenreId == genre._id ? null : (
                                <IconButton onClick={() => deleteGenre(genre._id)} >
                                    <Delete />
                                </IconButton>
                            )
                            )}
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            {editingGenreId === genre._id ? (
                                <TextField
                                    value={editedGenreName}
                                    onChange={(e) => setEditedGenreName(e.target.value)}
                                    sx={{ mr: 2, textAlign: "right" }}
                                    autoFocus
                                />
                            ) : (
                                <ListItemText
                                    primary={genre.name}
                                    sx={{ textAlign: "right", fontWeight: "bold" }}
                                />
                            )}
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
