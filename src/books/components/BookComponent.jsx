import React from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Button,
    Tooltip,
    IconButton
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function BookComponent({ book }) {
    return (
        <Card key={book._id} sx={{ maxWidth: 500, m: 2 }}> {/* הגדלת הרוחב */}
            <CardMedia
                component="img"
                height="140"
                image={book.image}
                alt={book.alt}
            />
            <CardContent sx={{ textAlign: "right" }}>
                <Typography variant="h6" component="div">
                    {book.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {book.author.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ז'אנר: {book.genre.name}
                </Typography>

                {/* הספר בספרייה / הספר מושאל */}
                <Typography
                    variant="body2"
                    sx={{ color: "#5066C1", mt: 2 }}
                >
                    {book.inLibrary ? "הספר בספרייה" : "הספר מושאל"}
                </Typography>

                {/* הספר מוזמן / הספר לא מוזמן */}
                <Tooltip
                    title={
                        book.orders.length > 0
                            ? book.orders.map(order => order.userName).join(", ")
                            : ""
                    }
                    arrow
                >
                    <Typography variant="body2" sx={{ color: "#F68832" }}>
                        {book.orders.length > 0
                            ? `הספר מוזמן ע"י ${book.orders.length}`
                            : "הספר לא מוזמן "}
                    </Typography>
                </Tooltip>

                {/* כפתור הזמן ואייקון לב */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2 }}>
                    <Button variant="contained" sx={{ backgroundColor: "#F68832" }}>
                        הזמן
                    </Button>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton>
                            <FavoriteIcon />
                        </IconButton>
                        <Typography variant="body2">{book.likes.length}</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
