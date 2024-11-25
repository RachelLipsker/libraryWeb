import React, { useEffect, useState } from 'react'
import useBooks from '../hooks/useBooks';
import BooksFeedback from '../components/BooksFeedback';
import { useCurrentUser } from '../../users/providers/UserProvider';
import useUsers from '../../users/hooks/useUsers';
import AllAuthors from '../../authors/components/AllAuthors';
import AllGenres from '../../genres/components/AllGenres';
import {
    Box,
    Button,
    IconButton
} from "@mui/material";
import AddNewBookButton from '../components/AddNewBookButton';
import ResetOrders from '../components/ResetOrders';
import Search from '../components/Search';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';

export default function BooksPage() {
    const { filterBooks, books, getAllBooks, isLoading, error, handleLike, handleOrder, handleDeleteBook, handleResetOrders } =
        useBooks();
    const { user } = useCurrentUser();
    const { profile, getUserById } = useUsers();
    const [list, setList] = useState(false);

    const [openComponents, setOpenComponents] = useState({
        orders: false,
        authors: false,
        genres: false,
    });

    const toggleComponent = (component) => {
        setOpenComponents((prev) => ({
            ...prev,
            [component]: !prev[component],
        }));
    };


    useEffect(() => {
        getAllBooks();
        if (user) {
            getUserById(user._id);
        }
    }, [user]);
    return (
        <>
            <Box sx={{ display: "flex", alignItems: "start", mt: 2 }}>
                {/* {user?.isAdmin ? <>
                    <Box>
                        <ResetOrders handleResetOrders={handleResetOrders} />
                        <AllAuthors books={books} />
                        <AllGenres books={books} />
                    </Box>
                </> : null} */}

                <Box sx={{ mt: 2, width: "300px" }}>
                    {user?.isAdmin && (
                        <>
                            {/* כפתור וניהול הזמנות */}
                            <Box sx={{ mb: 2 }}>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: "#5066C1" }}
                                    onClick={() => toggleComponent("orders")}
                                    fullWidth
                                >
                                    ניהול הזמנות
                                </Button>
                                {openComponents.orders && (
                                    <Box sx={{ mt: 2 }}>
                                        <ResetOrders handleResetOrders={handleResetOrders} />
                                    </Box>
                                )}
                            </Box>

                            {/* כפתור וניהול סופרים */}
                            <Box sx={{ mb: 2 }}>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: "#5066C1" }}
                                    onClick={() => toggleComponent("authors")}
                                    fullWidth
                                >
                                    ניהול סופרים
                                </Button>
                                {openComponents.authors && (
                                    <Box sx={{ mt: 2 }}>
                                        <AllAuthors books={books} />
                                    </Box>
                                )}
                            </Box>

                            {/* כפתור וניהול ז'אנרים */}
                            <Box sx={{ mb: 2 }}>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: "#5066C1" }}
                                    onClick={() => toggleComponent("genres")}
                                    fullWidth
                                >
                                    ניהול ז'אנרים
                                </Button>
                                {openComponents.genres && (
                                    <Box sx={{ mt: 2 }}>
                                        <AllGenres books={books} />
                                    </Box>
                                )}
                            </Box>
                        </>
                    )}
                </Box>

                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', m: 2, gap: 2 }}>
                        <Search />
                        <IconButton
                            onClick={() => setList(prev => !prev)} sx={{ border: '1px solid #ccc', borderRadius: '8px' }}>
                            {list ? <GridViewIcon fontSize="large" /> : <ViewListIcon fontSize="large" />}
                        </IconButton>
                    </Box>
                    <BooksFeedback
                        filterBooks={filterBooks}
                        books={books}
                        isLoading={isLoading}
                        error={error}
                        handleLike={handleLike}
                        handleOrder={handleOrder}
                        profile={profile}
                        handleDeleteBook={handleDeleteBook}
                        list={list}
                    />
                </Box>
            </Box>

            {user?.isAdmin ? <AddNewBookButton /> : null}
        </>
    )
}
