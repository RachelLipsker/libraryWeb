import FavoriteIcon from "@mui/icons-material/Favorite";
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
import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../users/providers/UserProvider";

export default function BookComponent({ book, handleLike, handleOrder, profile, booksToOrder, userOrdersLength, ableToOrder, setAbleToOrder, setUserOrdersLength }) {
    const { user } = useCurrentUser();
    const [liked, setLiked] = useState(() => {
        if (!user) {
            return false;
        } else {
            return !!book.likes.find(id => id === user._id)
        }
    });
    const [likesLength, setLikesLength] = useState(book.likes.length)
    const likeBook = () => {
        handleLike(book._id, user);
        if (liked) {
            setLikesLength(prev => prev - 1)
        } else {
            setLikesLength(prev => prev + 1)
        }
        setLiked(prev => !prev);
    }



    //////////////////


    const [idOrders, setIdOrders] = useState(() => {
        return book.orders.map(order => order.userId) || [];
    })

    const [ordered, setordered] = useState(() => {
        if (!user) {
            return false;
        } else {
            return !!idOrders.find(id => id == user._id)
        }
    });

    // const [booksToOrder, setBooksToOrder] = useState(profile?.booksToOrder || 0)

    // const [userOrdersLength, setUserOrdersLength] = useState(profile?.orders?.length || 0)

    const [bookOrdersLength, setBookOrdersLength] = useState(book.orders?.length || 0)

    const [userNames, setUserNames] = useState(() => {
        return book.orders?.map(order => order.userName) || [];
    })

    // const [ableToOrder, setAbleToOrder] = useState(() => {
    //     if (!user || userOrdersLength >= booksToOrder) {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // });

    useEffect(() => {
        if (!user || userOrdersLength >= booksToOrder) {
            setAbleToOrder(false)
        } else {
            setAbleToOrder(true)
        }
    }, [userOrdersLength, booksToOrder, user])

    const orderBook = () => {
        handleOrder(book._id, user._id)
        if (ordered) {
            setUserOrdersLength(prev => prev - 1)
            setBookOrdersLength(prev => prev - 1)
            setUserNames(prev => prev.slice(0, -1));
            setIdOrders(prev => prev.slice(0, -1))
        } else {
            setUserOrdersLength(prev => prev + 1);
            setBookOrdersLength(prev => prev + 1);
            setUserNames(prev => [...prev, profile.firstName + " " + profile.lastName]);
            setIdOrders(prev => [...prev, user._id]);
        }

        setordered(prev => !prev);
    }

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
                        bookOrdersLength > 0
                            ? userNames.join(", ")
                            : ""
                    }
                    arrow
                >
                    <Typography variant="body2" sx={{ color: "#F68832" }}>
                        {bookOrdersLength > 0
                            ? `הספר מוזמן ע"י ${bookOrdersLength}`
                            : "הספר לא מוזמן "}
                    </Typography>
                </Tooltip>

                {/* כפתור הזמן ואייקון לב */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2 }}>
                    { }
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#F68832" }}
                        disabled={!(ordered || ableToOrder)}
                        onClick={orderBook}
                    >
                        {ordered ? "הסר הזמנה" : "הזמן"}
                    </Button>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton onClick={likeBook}>
                            <FavoriteIcon style={{ color: liked ? "#91D2F1" : "inherit" }} />
                        </IconButton>
                        <Typography variant="body2">{likesLength}</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card >
    );
}
