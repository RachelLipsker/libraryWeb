import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function AddButton({ onClick, children }) {
    return (
        <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onClick}
            sx={{
                fontSize: '14px',
                textTransform: 'none',
                boxShadow: 2,
                transition: 'all 0.3s ease',
                backgroundColor: "#5066C1"
            }}
        >
            {children}
        </Button>
    );
}
