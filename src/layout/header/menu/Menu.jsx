import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { useCurrentUser } from "../../../users/providers/UserProvider";
import useUsers from "../../../users/hooks/useUsers";
import ROUTES from "../../../routes/routerModel";
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from "@mui/material";
import PortraitIcon from '@mui/icons-material/Portrait';
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Menu = ({ isOpen, anchorEl, onClose }) => {
    const navigate = useNavigate();
    const { user } = useCurrentUser();
    const { handleLogout } = useUsers();

    const onLogout = () => {
        handleLogout();
        onClose();
    };

    return (
        <MuiMenu
            open={isOpen}
            onClose={onClose}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
        >
            <Box>

                {/* {!user && (
                    <>

                        <MenuItem onClick={() => { onClose(); navigate(ROUTES.LOGIN) }} sx={{ display: { xs: "block", md: "none" } }}>
                            <IconButton>
                                <LoginIcon />
                            </IconButton>
                            Login</MenuItem>

                        <MenuItem onClick={() => { onClose(); navigate(ROUTES.SIGNUP) }} sx={{ display: { xs: "block", md: "none" } }}>
                            <IconButton>
                                <PersonAddIcon />
                            </IconButton>
                            Signup</MenuItem>
                    </>
                )} */}
                {user && (
                    <>

                        <MenuItem onClick={() => { onClose(); navigate(ROUTES.USER_PROFILE + "/" + user._id) }}>
                            <IconButton>
                                <AccountCircleIcon />
                            </IconButton>
                            אזור אישי</MenuItem>

                        {/* <MenuItem onClick={() => { onClose(); navigate(ROUTES.EDIT_USER) }}>
                            <IconButton>
                                <ModeEditIcon />
                            </IconButton>
                            Edit Account</MenuItem> */}

                        {/* <MenuItem onClick={() => { onClose(); navigate(ROUTES.FAV_CARDS) }} sx={{ display: { xs: "block", md: "none" } }}>
                            <IconButton>
                                <FavoriteIcon />
                            </IconButton>
                            Favorite Cards</MenuItem> */}

                        {/* <MenuItem onClick={() => { onClose(); navigate(ROUTES.MY_CARDS) }} sx={{ display: { xs: "block", md: "none" } }}>
                            <IconButton>
                                <PortraitIcon />
                            </IconButton>
                            My Cards</MenuItem> */}

                        <MenuItem onClick={onLogout}>
                            <IconButton>
                                <LogoutIcon />
                            </IconButton>
                            התנתקות</MenuItem>
                    </>
                )}
            </Box>
        </MuiMenu>
    );
};

export default Menu;
