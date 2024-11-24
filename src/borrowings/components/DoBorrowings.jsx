import React, { useEffect, useState } from "react";
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
    const [helperText, setHelperText] = useState("");


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
    // const isButtonDisabled = !selectedUser ||
    //     !selectedBook ||
    //     (action == "borrow" && !selectedBook.inLibrary) ||
    //     (action == "borrow" && selectedUser.openBorrowings?.length >= selectedUser.booksToBorrowing) ||
    //     (action == "borrow" && selectedBook.orders?.length > 0 && selectedBook.orders[0].userId != selectedUser._id) ||
    //     (action == "return" && selectedBook.inLibrary) ||
    //     (action == "return" && selectedUser.openBorrowings?.length == 0) ||
    //     (action == "return" && !(!!selectedUser.openBorrowings.map(borrow => borrow.bookId).find(bookId => bookId == selectedBook._id)))

    const isButtonDisabled = helperText == "" ? false : true;

    useEffect(() => {
        setHelperText(() => {
            if (!selectedUser) return "לא נבחר משתמש";
            if (!selectedBook) return "לא נבחר ספר";
            if (action == "borrow" && !selectedBook.inLibrary) return "הספר לא בספריה";
            if (action == "borrow" && selectedUser.openBorrowings?.length >= selectedUser.booksToBorrowing) return "המשתמש לא יכול להשאיל עוד ספר";
            if (action == "borrow" && selectedBook.orders?.length > 0 && selectedBook.orders[0].userId != selectedUser._id) return "הספר מוזמן ע'י משתמש אחר";
            if (action == "return" && selectedBook.inLibrary) return "הספר בספריה";
            if (action == "return" && selectedUser.openBorrowings?.length == 0) return "המשתמש לא השאיל ספרים";
            if (action == "return" && !(!!selectedUser.openBorrowings.map(borrow => borrow.bookId).find(bookId => bookId == selectedBook._id))) return "המשתמש לא השאיל ספר זה";
            else return "";
        })
    }, [selectedBook, selectedUser, action])


    return (
        <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
            dir="rtl"

            sx={{
                width: "100%",
                justifyContent: "space-between",
                alignItems: "start",
                padding: 2,
                boxShadow: 2,
                borderRadius: 2,
                "@media (max-width: 600px)": {
                    flexDirection: "column",
                    alignItems: "flex-start",
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
                        key={user._id}
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
                value={selectedBook}
                options={books}
                getOptionLabel={(book) => book.title}
                onChange={(event, newValue) => setSelectedBook(newValue || null)}
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
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start", // ליישור הכפתור והטקסט
                    justifyContent: "center", // כדי שהטיפוגרפיה תוצמד לכפתור
                    gap: 1, // מרווח בין הכפתור לטקסט
                    height: "100%", // גובה אחיד עם שאר האלמנטים
                }}
            >
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
                <Typography>{helperText}</Typography>
            </Box>
        </Box>
    );
};

export default DoBorrowings;
