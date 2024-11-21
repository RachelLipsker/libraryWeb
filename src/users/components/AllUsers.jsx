import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import DeleteIcon from "@mui/icons-material/Delete"; // אייקון מחיקה
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routerModel";

const AllUsers = ({
    currentUser,
    users,
    onUpdateBooksToBorrowing,
    onUpdateBooksToOrder,
    onToggleUserRole,
    onDeleteUser
}) => {
    const [editableRow, setEditableRow] = useState(null);
    const [editedValues, setEditedValues] = useState({});
    const navigate = useNavigate();
    const handleEditClick = (userId, field, value) => {
        setEditableRow(userId);
        setEditedValues({ ...editedValues, [field]: value });
    };

    const handleSaveClick = (userId, field) => {
        if (field === "booksToBorrowing") {
            onUpdateBooksToBorrowing(userId, editedValues[field]);
        } else if (field === "booksToOrder") {
            onUpdateBooksToOrder(userId, editedValues[field]);
        }
        setEditableRow(null);
    };

    const handleInputChange = (field, value) => {
        setEditedValues({ ...editedValues, [field]: value });
    };

    const handleDeleteClick = (userId) => {
        onDeleteUser(userId); // קריאה לפונקציה של מחיקת משתמש
    };

    return (
        <TableContainer component={Paper}>
            <Table dir="rtl">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">שם מלא</TableCell>
                        <TableCell align="center">טלפון</TableCell>
                        <TableCell align="center">אימייל</TableCell>
                        <TableCell align="center">מספר ספרים להשאלה</TableCell>
                        <TableCell align="center">מספר ספרים להזמנה</TableCell>
                        <TableCell align="center">תפקיד</TableCell>
                        <TableCell align="center">מחיקה</TableCell> {/* עמודת מחיקה */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user._id}>
                            <TableCell align="center"
                                sx={{ textDecoration: "underline", color: "#5066C1", cursor: "pointer" }}
                                onClick={() => navigate(ROUTES.USER_PROFILE + "/" + user._id)}>
                                {user.firstName} {user.lastName} {currentUser._id == user._id ? " - אני" : null}
                            </TableCell>
                            <TableCell align="center">{user.phone}</TableCell>
                            <TableCell align="center">{user.email}</TableCell>

                            {/* מספר ספרים להשאלה */}
                            <TableCell align="center">
                                {editableRow === user._id && editedValues["booksToBorrowing"] !== undefined ? (
                                    <>
                                        <TextField
                                            value={editedValues["booksToBorrowing"]}
                                            onChange={(e) => handleInputChange("booksToBorrowing", e.target.value)}
                                            size="small"
                                            sx={{ width: 100 }}
                                        />
                                        <IconButton
                                            onClick={() => handleSaveClick(user._id, "booksToBorrowing")}
                                            sx={{ ml: 1 }}
                                        >
                                            <SaveIcon />
                                        </IconButton>
                                    </>
                                ) : (
                                    <>
                                        {user.booksToBorrowing}
                                        <IconButton onClick={() => handleEditClick(user._id, "booksToBorrowing", user.booksToBorrowing)}>
                                            <EditIcon />
                                        </IconButton>
                                    </>
                                )}
                            </TableCell>

                            {/* מספר ספרים להזמנה */}
                            <TableCell align="center">
                                {editableRow === user._id && editedValues["booksToOrder"] !== undefined ? (
                                    <>
                                        <TextField
                                            value={editedValues["booksToOrder"]}
                                            onChange={(e) => handleInputChange("booksToOrder", e.target.value)}
                                            size="small"
                                            sx={{ width: 100 }}
                                        />
                                        <IconButton
                                            onClick={() => handleSaveClick(user._id, "booksToOrder")}
                                            sx={{ ml: 1 }}
                                        >
                                            <SaveIcon />
                                        </IconButton>
                                    </>
                                ) : (
                                    <>
                                        {user.booksToOrder}
                                        <IconButton onClick={() => handleEditClick(user._id, "booksToOrder", user.booksToOrder)}>
                                            <EditIcon />
                                        </IconButton>
                                    </>
                                )}
                            </TableCell>

                            {/* תפקיד */}
                            <TableCell align="center" style={{ color: user.isAdmin ? "#06A28C" : "#F49D49" }}>
                                {user.isAdmin ? "מנהל מערכת" : "משתמש רגיל"}
                                <IconButton onClick={() => onToggleUserRole(user._id)}>
                                    <SwapHorizIcon />
                                </IconButton>
                            </TableCell>

                            {/* כפתור מחיקה */}
                            <TableCell align="center">
                                {user._id != currentUser._id && user.openBorrowings?.length == 0 ? <IconButton onClick={() => handleDeleteClick(user._id)}>
                                    <DeleteIcon />
                                </IconButton> : null}

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AllUsers;
