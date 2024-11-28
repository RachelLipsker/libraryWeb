import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    FormControl,
    FormControlLabel,
    Checkbox,
    Radio,
    RadioGroup,
    FormLabel,
    Divider,
} from "@mui/material";

export default function FilterBooks({ authorsList, genresList, onFilterChange }) {
    const [filters, setFilters] = useState({
        authors: [],
        genres: [],
        inLibrary: false,
    });
    const [showAll, setShowAll] = useState(true); // ברירת מחדל: הצג הכל

    const handleCheckboxChange = (type, value) => {
        setFilters((prev) => {
            const updatedValues = prev[type].includes(value)
                ? prev[type].filter((item) => item !== value)
                : [...prev[type], value];

            return { ...prev, [type]: updatedValues };
        });
        setShowAll(false);
    };

    // const handleFavoritesChange = (e) => {
    //     setFilters((prev) => ({ ...prev, favorites: e.target.checked }));
    //     setShowAll(false);
    // };

    const handleInLibraryChange = (e) => {
        setFilters((prev) => ({ ...prev, inLibrary: e.target.checked }));
        setShowAll(false);
    };

    const handleShowAllChange = () => {
        setShowAll(true);
        setFilters({ authors: [], genres: [], favorites: false, inLibrary: false });
    };

    // נוסיף כאן בדיקה אם לא נבחרו פילטרים, אז נשיב את הצג הכל
    useEffect(() => {
        if (filters.authors.length === 0 && filters.genres.length === 0 && !filters.inLibrary) {
            setShowAll(true);
        }
    }, [filters]);

    useEffect(() => {
        onFilterChange(filters);
    }, [filters, onFilterChange]);


    return (
        <Box
            elevation={3}
            sx={{
                m: 1,
                border: "1px solid #ccc", // צבע המסגרת
                borderRadius: "8px", // קצוות מעוגלים
                padding: "16px", // ריווח פנימי
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // הצללה קלה
            }}
        >
            <Typography variant="h6" sx={{
                mb: 2,
                fontWeight: "bold",
                fontSize: "1.1rem",
                textAlign: "center", // כותרת במרכז
                color: "#000"
            }}>
                סינון ספרים
            </Typography>

            <FormControl component="fieldset" fullWidth>
                {/* <FormLabel
                    component="legend"
                    sx={{
                        textAlign: "right",
                        fontWeight: "bold",
                        marginBottom: 1,
                    }}
                >
                    אפשרויות תצוגה
                </FormLabel> */}
                <RadioGroup
                    value={showAll ? "all" : "filtered"}
                    onChange={handleShowAllChange}
                    row
                >
                    <Box
                        sx={{
                            textAlign: "right", // יישור השורה לימין
                            width: "100%", // הבטחת פריסה מלאה
                        }}
                    >
                        <FormControlLabel
                            value="all"
                            control={<Radio />}
                            label="הצג הכל"
                            sx={{
                                display: "flex",
                                flexDirection: "row-reverse", // העיגול מימין לטקסט
                                justifyContent: "flex-start", // הבטחת סדר נכון
                                marginRight: 0,
                            }}
                        />
                    </Box>
                </RadioGroup>

            </FormControl>

            <Divider sx={{ my: 2 }} />

            <FormControl component="fieldset" fullWidth>
                <FormLabel
                    component="legend"
                    sx={{
                        textAlign: "right",
                        fontWeight: "bold",
                        marginBottom: 1,
                    }}
                >
                    סנן לפי סופרים
                </FormLabel>
                <Box>
                    {authorsList?.map(({ _id, name }) => (
                        <FormControlLabel
                            key={_id}
                            control={
                                <Checkbox
                                    checked={filters.authors.includes(_id)}
                                    onChange={() => handleCheckboxChange("authors", _id)}
                                />
                            }
                            label={name}
                            sx={{
                                display: "flex",
                                flexDirection: "row-reverse", // הריבוע מימין לטקסט
                                justifyContent: "flex-start",
                                alignItems: "center",
                                marginBottom: 1,
                            }}
                        />
                    ))}
                </Box>
            </FormControl>

            <Divider sx={{ my: 2 }} />

            <FormControl component="fieldset" fullWidth>
                <FormLabel
                    component="legend"
                    sx={{
                        textAlign: "right",
                        fontWeight: "bold",
                        marginBottom: 1,
                    }}
                >
                    סנן לפי ז'אנרים
                </FormLabel>
                <Box>
                    {genresList?.map(({ _id, name }) => (
                        <FormControlLabel
                            key={_id}
                            control={
                                <Checkbox
                                    checked={filters.genres.includes(_id)}
                                    onChange={() => handleCheckboxChange("genres", _id)}
                                />
                            }
                            label={name}
                            sx={{
                                display: "flex",
                                flexDirection: "row-reverse", // הריבוע מימין לטקסט
                                justifyContent: "flex-start",
                                alignItems: "center",
                                marginBottom: 1,
                            }}
                        />
                    ))}
                </Box>
            </FormControl>

            <Divider sx={{ my: 2 }} />
            <FormControl component="fieldset" fullWidth>
                <FormLabel
                    component="legend"
                    sx={{
                        textAlign: "right",
                        fontWeight: "bold",
                        marginBottom: 1,
                    }}
                >
                    סנן לפי זמינות
                </FormLabel>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filters.inLibrary}
                            onChange={handleInLibraryChange}
                        />
                    }
                    label="ספרים שבספריה"
                    sx={{
                        display: "flex",
                        flexDirection: "row-reverse", // הריבוע מימין לטקסט
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}
                />
            </FormControl>

            {/* <FormControlLabel
                control={
                    <Checkbox
                        checked={filters.favorites}
                        onChange={handleFavoritesChange}
                    />
                }
                label="ספרים שאהבתי"
                sx={{
                    display: "flex",
                    flexDirection: "row-reverse", // הריבוע מימין לטקסט
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}
            /> */}
        </Box>
    );
}
