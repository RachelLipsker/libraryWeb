import React from 'react'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useCurrentUser } from '../../users/providers/UserProvider';
import ROUTES from '../../routes/routerModel';
import NavLink from '../../components/NavLink';
import { useMenu } from './menu/MenuProvider';




export default function RightNav() {
    const { user } = useCurrentUser();
    const setOpen = useMenu();

    return (
        <>
            {user ? <EmojiEmotionsIcon sx={{ mr: "auto" }} onClick={() => setOpen(true)} />
                : <NavLink to={ROUTES.LOGIN}>התחברות</NavLink>}
        </>
    )
}
