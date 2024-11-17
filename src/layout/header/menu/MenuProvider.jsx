import React, {
    useState,
    useContext,
    useRef,
    useEffect,
    createContext,
} from "react";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import Menu from "./Menu";

const MenuContext = createContext(null);

export const MenuProvider = ({ children }) => {
    const theme = useMuiTheme();
    const screenSize = useMediaQuery(theme.breakpoints.up("md"));

    const [isOpen, setOpen] = useState(false);
    const [anchorEL, setAnchor] = useState(null);
    const anchorRef = useRef();

    useEffect(() => {
        setAnchor(anchorRef.current);
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [screenSize]);

    return (
        <>
            <MenuContext.Provider value={setOpen}>{children}</MenuContext.Provider>

            <Box
                ref={anchorRef}
                component="span"
                position="fixed"
                top="70px"
                left="20px"
            ></Box>
            {anchorEL && (
                <Menu
                    anchorEl={anchorEL}
                    isOpen={isOpen}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
};

export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) throw new Error("useMenu must be used within a MenuProvider");
    return context;
};
