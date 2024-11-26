import React from "react";
import {
    Box,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";

export default function SortBooks({ setSortOption }) {
    const handleChange = (event) => {
        const selectedOption = event.target.value;
        setSortOption(selectedOption);
    };

    return (
        <Box
            sx={{
                m: 1,
                border: "1px solid #ccc", // צבע המסגרת
                borderRadius: "8px", // קצוות מעוגלים
                padding: "16px", // ריווח פנימי
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // הצללה קלה
            }}
        >
            <FormControl fullWidth>
                <FormLabel
                    sx={{
                        mb: 2,
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        textAlign: "center", // כותרת במרכז
                        color: "#000"
                    }}
                >
                    מיון ספרים                </FormLabel>
                <RadioGroup
                    onChange={handleChange}
                    defaultValue="AtoZ" // ערך ברירת מחדל
                    sx={{ textAlign: "right" }} // יישור הקבוצה לימין
                >
                    <FormControlLabel
                        value="AtoZ"
                        control={<Radio />}
                        label="מא' - ת'"
                        sx={{
                            mb: 1,
                            display: "flex",
                            flexDirection: "row-reverse", // עיגול מימין
                        }}
                    />
                    <FormControlLabel
                        value="ZtoA"
                        control={<Radio />}
                        label="מת' - א'"
                        sx={{
                            mb: 1,
                            display: "flex",
                            flexDirection: "row-reverse",
                        }}
                    />
                    <FormControlLabel
                        value="newest"
                        control={<Radio />}
                        label="מהחדש לישן"
                        sx={{
                            mb: 1,
                            display: "flex",
                            flexDirection: "row-reverse",
                        }}
                    />
                    <FormControlLabel
                        value="oldest"
                        control={<Radio />}
                        label="מהישן לחדש"
                        sx={{
                            display: "flex",
                            flexDirection: "row-reverse",
                        }}
                    />
                </RadioGroup>
            </FormControl>
        </Box>
    );
}
