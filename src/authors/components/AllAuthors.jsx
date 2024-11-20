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
import useAuthors from "../hooks/useAuthors";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";

export default function AllAuthors({ books }) {
    const { authors, getAllAuthors, isLoading, error, addAuthor, editAuthor, deleteAuthor } = useAuthors();
    const [newAuthorName, setNewAuthorName] = useState("");
    const [editingAuthorId, setEditingAuthorId] = useState(null);
    const [editedAuthorName, setEditedAuthorName] = useState("");

    useEffect(() => {
        getAllAuthors();
    }, []);

    const handleAddAuthor = () => {
        addAuthor(newAuthorName);
        setNewAuthorName("");
    };

    const handleEditAuthor = (id, name) => {
        setEditingAuthorId(id);
        setEditedAuthorName(name);
    };

    const handleSaveAuthor = (id) => {
        if (editedAuthorName.trim()) {
            editAuthor(id, editedAuthorName);  // Assuming the editAuthor function updates the author's name
            setEditingAuthorId(null);
            setEditedAuthorName("");
        }
    };

    if (isLoading) return <Spinner />;
    if (error) return <Error errorMessage={error} />;

    return (
        <Box
            sx={{
                p: 1,
                border: "1px solid #ccc",
                borderRadius: 2,
            }}
        >
            {/* Add Author Section */}
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
                    onClick={handleAddAuthor}
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
                    placeholder="סופר"
                    value={newAuthorName}
                    onChange={(e) => setNewAuthorName(e.target.value)}
                    InputProps={{
                        notched: false,
                        sx: { "& input": { textAlign: "right" } },
                    }}
                />
            </Box>

            {/* Authors List */}
            <List>
                {authors.map((author) => (
                    <ListItem
                        key={author._id}
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
                            {editingAuthorId === author._id ? (
                                <IconButton onClick={() => handleSaveAuthor(author._id)}>
                                    <Save />
                                </IconButton>
                            ) : (
                                <IconButton onClick={() => handleEditAuthor(author._id, author.name)}>
                                    <Edit />
                                </IconButton>
                            )}
                            {/* Hide Delete button when in edit mode */}
                            {editingAuthorId !== author._id && (
                                !!books?.map(book => book.author._id).find(id => id !== author._id) && (
                                    <IconButton onClick={() => deleteAuthor(author._id)}>
                                        <Delete />
                                    </IconButton>
                                )
                            )}
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            {editingAuthorId === author._id ? (
                                <TextField
                                    value={editedAuthorName}
                                    onChange={(e) => setEditedAuthorName(e.target.value)}
                                    sx={{ mr: 2, textAlign: "right" }}
                                    autoFocus
                                />
                            ) : (
                                <ListItemText
                                    primary={author.name}
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
