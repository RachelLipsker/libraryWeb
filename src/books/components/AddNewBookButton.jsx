import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routerModel';

export default function AddNewBookButton() {
    const navigate = useNavigate();
    return (
        <>
            <Button
                variant="contained"
                sx={{
                    m: 2, p: 4, fontSize: "35px",
                    borderRadius: "50%",
                    width: "55px",
                    height: "55px",
                    position: "fixed",
                    right: "16px",
                    bottom: "40px",
                    backgroundColor: "#06A28C"
                }}
                onClick={() => navigate(ROUTES.CREATE_BOOK)}>+</Button>
        </>
    )
}
