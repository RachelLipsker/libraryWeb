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
import SortBooks from '../components/SortBooks';
import useSortBooks from '../hooks/useSortBooks';
import FilterBooks from '../components/FilterBooks';
import useAuthors from '../../authors/hooks/useAuthors';
import useGenres from '../../genres/hooks/useGenres';

export default function BooksPage() {
    const { books, getAllBooks, isLoading, error, handleLike, handleOrder, handleDeleteBook, handleResetOrders, handleFilterChange, secondFilterBooks } = useBooks();
    const { user } = useCurrentUser();
    const { profile, getUserById } = useUsers();
    const [list, setList] = useState(false);
    const { authors, getAllAuthors, addAuthor, editAuthor, deleteAuthor } = useAuthors();
    const { genres, getAllGenres, addGenre, editGenre, deleteGenre } = useGenres();
    const { sortOption, setSortOption, sortBooks } = useSortBooks();

    const sortedBooks = sortBooks(secondFilterBooks);


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
        getAllAuthors();
        getAllGenres();
    }, []);

    useEffect(() => {
        getAllBooks();
        if (user) {
            getUserById(user._id);
        }
    }, [user]);
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "start",
                    mt: 2,
                    flexDirection: {
                        xs: "column-reverse", // במובייל (מסך קטן) טורים
                        sm: "row",    // במסכים גדולים יותר שורות
                    },
                }}
            >           <Box
                sx={{
                    mt: 2,
                    width: "280px",
                    alignSelf: { xs: "center", sm: "flex-start" }, // במובייל ממורכז, במסכים גדולים בשמאל
                }}
            >
                    {user?.isAdmin && (
                        <>
                            <Box sx={{ mb: 2 }}>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: "#5066C1", width: "280px" }}
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
                                        <AllAuthors
                                            books={books}
                                            authors={authors}
                                            editAuthor={editAuthor}
                                            deleteAuthor={deleteAuthor}
                                            addAuthor={addAuthor}
                                        />
                                    </Box>
                                )}
                            </Box>

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
                                        <AllGenres
                                            books={books}
                                            genres={genres}
                                            addGenre={addGenre}
                                            editGenre={editGenre}
                                            deleteGenre={deleteGenre}
                                        />
                                    </Box>
                                )}
                            </Box>
                        </>
                    )}
                    <SortBooks setSortOption={setSortOption} />
                    <FilterBooks
                        authorsList={authors} // מערך הסופרים עם _id ו-name
                        genresList={genres} // מערך הז'אנרים עם _id ו-name
                        onFilterChange={handleFilterChange}
                    />
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
                        filterBooks={sortedBooks}
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
