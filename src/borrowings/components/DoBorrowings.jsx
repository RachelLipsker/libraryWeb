import React, { useState } from "react";
import {
    Box,
    Autocomplete,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Button,
    Typography,
} from "@mui/material";

const DoBorrowings = ({ users, books, onBorrow, onReturn }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [action, setAction] = useState("borrow");

    const handleActionChange = (_, newAction) => {
        if (newAction) {
            setAction(newAction);
        }
    };

    const handleSubmit = () => {
        if (action === "borrow") {
            onBorrow(selectedUser._id, selectedBook._id);
        } else if (action === "return") {
            onReturn(selectedUser._id, selectedBook._id);
        }
        setSelectedBook(null)
        setSelectedUser(null)
    };

    // תנאי לזמינות הכפתור
    const isButtonDisabled = !selectedUser ||
        !selectedBook ||
        (action == "borrow" && !selectedBook.inLibrary) ||
        (action == "borrow" && selectedUser.openBorrowings?.length >= selectedUser.booksToBorrowing) ||
        (action == "borrow" && selectedBook.orders?.length > 0 && selectedBook.orders[0].userId != selectedUser._id) ||
        (action == "return" && selectedBook.inLibrary) ||
        (action == "return" && selectedUser.openBorrowings?.length == 0) ||
        (action == "return" && !(!!selectedUser.openBorrowings.map(borrow => borrow.bookId).find(bookId => bookId == selectedBook._id)))

    return (
        <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
            dir="rtl"
            sx={{
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                boxShadow: 2,
                borderRadius: 2,
                "@media (max-width: 600px)": {
                    flexDirection: "column",
                },
            }}
        >

            <Autocomplete
                value={selectedUser} // מסנכרן את הערך של ה־Autocomplete עם הסטייט
                options={users}
                getOptionLabel={(user) => `${user.firstName} ${user.lastName}`}
                renderOption={(props, user) => (
                    <Box
                        component="li"
                        {...props}
                        sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                        <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ ml: 1 }}
                        >
                            {user.email}
                        </Typography>
                    </Box>
                )}
                onChange={(event, newValue) => setSelectedUser(newValue || null)} // שומר את כל האובייקט
                renderInput={(params) => (
                    <TextField {...params} label="בחר משתמש" variant="outlined" size="medium" />
                )}
                sx={{
                    flex: 1,
                    minWidth: "250px",
                }}
            />


            <Autocomplete
                value={selectedBook} // מסנכרן את הערך של ה־Autocomplete עם הסטייט
                options={books}
                getOptionLabel={(book) => book.title}
                onChange={(event, newValue) => setSelectedBook(newValue || null)} // שומר את כל האובייקט
                renderInput={(params) => (
                    <TextField {...params} label="בחר ספר" variant="outlined" size="medium" />
                )}
                sx={{
                    flex: 1,
                    minWidth: "250px",
                }}
            />

            <ToggleButtonGroup
                value={action}
                exclusive
                onChange={handleActionChange}
                aria-label="בחר פעולה"
                sx={{
                    height: "56px",
                    "& .MuiToggleButton-root": {
                        fontSize: "16px",
                        lineHeight: "normal",
                        padding: "8px 16px",
                    },
                }}
            >
                <ToggleButton value="borrow" aria-label="השאלה">
                    השאלה
                </ToggleButton>
                <ToggleButton value="return" aria-label="החזרה">
                    החזרה
                </ToggleButton>
            </ToggleButtonGroup>
            <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={isButtonDisabled}
                sx={{
                    height: "56px",
                    whiteSpace: "nowrap",
                    flex: "none",
                    minWidth: "150px",
                }}
            >
                בצע
            </Button>
        </Box>
    );
};

export default DoBorrowings;
