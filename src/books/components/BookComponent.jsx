import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Tooltip,
    Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useCurrentUser } from "../../users/providers/UserProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routerModel";

export default function BookComponent({
    book,
    handleLike,
    handleOrder,
    profile,
    booksToOrder,
    userOrdersLength,
    ableToOrder,
    setAbleToOrder,
    setUserOrdersLength,
    handleDeleteBook,
    list
}) {
    const navigate = useNavigate();
    const { user } = useCurrentUser();
    const [liked, setLiked] = useState(() => {
        if (!user) {
            return false;
        } else {
            return !!book.likes.find((id) => id === user._id);
        }
    });
    const [likesLength, setLikesLength] = useState(book.likes.length);
    const likeBook = () => {
        handleLike(book._id, user);
        setLikesLength((prev) => (liked ? prev - 1 : prev + 1));
        setLiked((prev) => !prev);
    };

    const [idOrders, setIdOrders] = useState(() => {
        return book.orders.map((order) => order.userId) || [];
    });

    const [ordered, setOrdered] = useState(() => {
        if (!user) {
            return false;
        } else {
            return !!idOrders.find((id) => id === user._id);
        }
    });

    const [bookOrdersLength, setBookOrdersLength] = useState(book.orders?.length || 0);

    const [userNames, setUserNames] = useState(() => {
        return book.orders?.map((order) => order.userName) || [];
    });

    useEffect(() => {
        if (!user || userOrdersLength >= booksToOrder) {
            setAbleToOrder(false);
        } else {
            setAbleToOrder(true);
        }
    }, [userOrdersLength, booksToOrder, user]);

    const orderBook = () => {
        handleOrder(book._id, user._id);
        setOrdered((prev) => !prev);
        setUserOrdersLength((prev) => (ordered ? prev - 1 : prev + 1));
        setBookOrdersLength((prev) => (ordered ? prev - 1 : prev + 1));
        setUserNames((prev) =>
            ordered ? prev.slice(0, -1) : [...prev, `${profile.firstName} ${profile.lastName}`]
        );
        setIdOrders((prev) => (ordered ? prev.slice(0, -1) : [...prev, user._id]));
    };

    return (
        <Card
            key={book._id}
            sx={{
                display: list ? "flex" : "block", // תצוגת שורות או כרטיסים
                flexDirection: list ? "row" : "column",
                alignItems: list ? "center" : "unset",
                width: list ? "100%" : 200,
                m: 2,
            }}
        >
            <CardMedia
                component="img"
                height={list ? "100px" : "140px"} // גובה קטן יותר בתצוגת שורות
                image={book.image}
                alt={book.alt}
                sx={{ width: list ? "100px" : "100%" }} // גובה ורוחב מותאם
            />
            <CardContent sx={{ textAlign: "right", flex: list ? 1 : "unset" }}>
                <Typography variant="h6" component="div">
                    {book.title}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                        {user?.isAdmin && (
                            <>
                                {book.inLibrary && (
                                    <IconButton onClick={() => handleDeleteBook(book._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                                <IconButton
                                    onClick={() => navigate(`${ROUTES.EDIT_BOOK}/${book._id}`)}
                                >
                                    <EditIcon />
                                </IconButton>
                            </>
                        )}
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" color="text.secondary">
                            {book.author.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            ז'אנר: {book.genre.name}
                        </Typography>
                    </Box>
                </Box>

                <Typography variant="body2" sx={{ color: "#5066C1", mt: 2 }}>
                    {book.inLibrary ? "הספר בספרייה" : "הספר מושאל"}
                </Typography>

                <Tooltip
                    title={bookOrdersLength > 0 ? userNames.join(", ") : ""}
                    arrow
                >
                    <Typography variant="body2" sx={{ color: "#F68832" }}>
                        {bookOrdersLength > 0
                            ? `הספר מוזמן ע"י ${bookOrdersLength}`
                            : "הספר לא מוזמן "}
                    </Typography>
                </Tooltip>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#F68832" }}
                        disabled={!(ordered || ableToOrder) || (!!profile?.openBorrowings?.map(borrow => borrow.bookId).find(id => id == book._id))}
                        onClick={orderBook}
                    >
                        {ordered ? "הסר הזמנה" : "הזמן"}
                    </Button>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton onClick={likeBook}>
                            <FavoriteIcon
                                style={{ color: liked ? "#91D2F1" : "inherit" }}
                            />
                        </IconButton>
                        <Typography variant="body2">{likesLength}</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
