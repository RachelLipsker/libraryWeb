import React from 'react';
import { Button } from '@mui/material';
import useBooks from '../hooks/useBooks';

export default function ResetOrders({ handleResetOrders }) {
    return (
        <div>
            <Button variant="outlined" onClick={handleResetOrders}
                sx={{ color: "#F96C68", width: "100%", border: "1px solid #F96C68", my: 2 }}>
                אפס את כל ההזמנות
            </Button>
        </div>
    );
}
