import React from "react";
import { Box, Typography } from "@mui/material";

const Borrowings = ({ borrowings }) => {
    if (!borrowings || borrowings.length === 0) {
        return (
            <Typography variant="body1" color="text.secondary" align="right">
                אין נתוני השאלות להצגה.
            </Typography>
        );
    }

    const formatDate = (date) => {
        if (!date) return null;
        return new Date(date).toLocaleDateString("he-IL", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                padding: 2,
                boxShadow: 2,
                borderRadius: 2,
                backgroundColor: "#f9f9f9",
                direction: "rtl", // התאמה לעברית
            }}
        >
            {/* כותרת הטבלה */}
            <Box
                sx={{
                    display: { xs: "none", sm: "flex" }, // מוסתר במסכים קטנים
                    fontWeight: "bold",
                    backgroundColor: "#e0e0e0",
                    padding: 1,
                    borderRadius: 2,
                }}
            >
                <Typography sx={{ flex: 1, textAlign: "right" }}>משתמש</Typography>
                <Typography sx={{ flex: 1, textAlign: "right" }}>ספר</Typography>
                <Typography sx={{ flex: 1, textAlign: "right" }}>תאריך השאלה</Typography>
                <Typography sx={{ flex: 1, textAlign: "right" }}>תאריך החזרה צפוי</Typography>
                <Typography sx={{ flex: 1, textAlign: "right" }}>סטטוס החזרה</Typography>
            </Box>

            {/* השאלות */}
            {borrowings.map((borrowing, index) => {
                const isOverdue =
                    borrowing.finalDateToReturn &&
                    Date.now() > new Date(borrowing.finalDateToReturn);

                return (
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" }, // שינוי מבנה לתצוגה אנכית במסכים קטנים
                            backgroundColor: isOverdue ? "#ffe6e6" : "#ffffff",
                            padding: 1,
                            borderRadius: 2,
                            borderBottom: "1px solid #ddd",
                        }}
                    >
                        <Typography
                            sx={{
                                flex: 1,
                                textAlign: "right",
                                fontWeight: { xs: "bold", sm: "normal" }, // מודגש במובייל
                            }}
                        >
                            {borrowing.userName}
                        </Typography>
                        <Typography sx={{ flex: 1, textAlign: "right" }}>
                            {borrowing.bookName}
                        </Typography>
                        <Typography sx={{ flex: 1, textAlign: "right" }}>
                            {formatDate(borrowing.borrowingDate)}
                        </Typography>
                        <Typography sx={{ flex: 1, textAlign: "right" }}>
                            {formatDate(borrowing.finalDateToReturn)}
                        </Typography>
                        <Typography
                            sx={{
                                flex: 1,
                                textAlign: "right",
                                fontWeight: borrowing.returnDate ? "normal" : "bold",
                            }}
                        >
                            {borrowing.returnDate
                                ? formatDate(borrowing.returnDate)
                                : "הספר אצל המשתמש"}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );
};

export default Borrowings;
